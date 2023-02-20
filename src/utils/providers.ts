import { ethers } from 'ethers'
import getRpcUrl from 'utils/getRpcUrl'

declare global {
  interface Window {
    ethereum: any;
  }
}

const RPC_URL = getRpcUrl()

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL)

export const simpleWeb3Provider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum) : null
 
export default null
