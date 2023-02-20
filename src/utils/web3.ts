/* eslint-disable import/no-mutable-exports */
import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'
import getRpcUrl from 'utils/getRpcUrl'

const RPC_URL = getRpcUrl()
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 } as HttpProviderOptions)

let web3NoAccount = null;

if (window.ethereum) {
  web3NoAccount = new Web3(window.ethereum)
} else {
  web3NoAccount = new Web3(httpProvider)
}

const getWeb3NoAccount = () => {
  return web3NoAccount
}

export { getWeb3NoAccount }
export default web3NoAccount
