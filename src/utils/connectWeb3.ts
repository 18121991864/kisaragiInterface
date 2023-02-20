/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
import Web3 from 'web3'
import { nodes } from './getRpcUrl'


const id = process.env.REACT_APP_CHAIN_ID;
const blockExplorerUrls = [process.env.BLOCK_EXPLORER_URLS];
const chainName = ["切换的网络名"];

export const connectWeb3 = async function () { 
  // 判断链对不，链不对就请求切换网络，或者添加网络，
      if (window.ethereum) {
        try {
          await (window.ethereum as any).request({
            method: 'wallet_switchEthereumChain',
            params: [{
              chainId: Web3.utils.numberToHex(id) // 目标链ID
            }]
          })
        } catch (e) {
          if ((e as any).code === 4902) {
            try {
              await (window.ethereum as any).request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: Web3.utils.numberToHex(id), // 目标链ID
                      nativeCurrency: {
                        name: 'bnb',
                        symbol: 'bnb',
                        decimals: 18
                      },
                      rpcUrls: nodes, // 节点
                      blockExplorerUrls
                    }
                  ]
                })
            } catch (ee) {
              //
            }
          } else if ((e as any).code === 4001) return null
        }
      }
  
  }