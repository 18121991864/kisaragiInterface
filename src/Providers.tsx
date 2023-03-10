import React from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { Provider } from 'react-redux'
import { getLibrary } from 'utils/web3React'
import { LanguageProvider } from 'contexts/Localization'
import store from 'state'

const Providers = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
          <LanguageProvider>
            {children}
          </LanguageProvider>
      </Provider>
    </Web3ReactProvider>
  )
}

export default Providers
