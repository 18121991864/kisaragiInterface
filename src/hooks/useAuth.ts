/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-alert */
import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {message} from 'antd'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
// import { ConnectorNames, connectorLocalStorageKey } from '@pancakeswap/uikit'
import { connectorsByName } from 'utils/web3React'
import { setupNetwork } from 'utils/wallet'
import { useAppDispatch } from 'state'
import { connectWeb3 } from 'utils/connectWeb3'

enum ConnectorNames {
  Injected = "injected",
  WalletConnect = "walletconnect",
  BSC = "bsc"
}

const connectorLocalStorageKey = "connectorId";

const useAuth = () => {
  const dispatch = useAppDispatch()
  const { activate, deactivate } = useWeb3React()

  const login = useCallback((connectorID?: ConnectorNames) => {
    const connector = connectorsByName[connectorID]
    if (connector) {
      activate(connector, async (error: Error) => {
        if (error instanceof UnsupportedChainIdError) {
          message.warning('Currently this page only supported in EthereumPlease switch your network to continue. Unable to switch network. Please try it on your wallet')
          deactivate()
          await connectWeb3()
          activate(connector)
        } else {
          window?.localStorage.removeItem(connectorLocalStorageKey)
          if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
            // toastError(t('Provider Error'), t('No provider was found'))
            window.location.href='https://metamask.app.link/dapp'
            // message.warning('Provider Error, No provider was found')
          } else if (
            error instanceof UserRejectedRequestErrorInjected ||
            error instanceof UserRejectedRequestErrorWalletConnect
          ) {
            if (connector instanceof WalletConnectConnector) {
              const walletConnector = connector as WalletConnectConnector
              walletConnector.walletConnectProvider = null
            }
            
            message.warning('Authorization Error, Please authorize to access your account')
            // toastError(t('Authorization Error'), t('Please authorize to access your account'))
          } else {
            message.warning(`${error.name}, ${error.message}`)
          }
        }
      })
    } else {
      message.warning('Can’t find connector, The connector config is wrong')
      // toastError(t('Can’t find connector'), t('The connector config is wrong'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activate])

  const logout = useCallback(() => {
    deactivate()
    window?.localStorage.removeItem(connectorLocalStorageKey)
  }, [deactivate])

  return { login, logout }
}

export default useAuth
