import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.scss'
import { TonConnectUIProvider } from '@tonconnect/ui-react'

// NEED TO CHANGE
const manifestUrl =
  'https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TonConnectUIProvider
      manifestUrl={manifestUrl}
      walletsListConfiguration={{
        includeWallets: [
          {
            appName: 'safepalwallet',
            name: 'SafePal',
            imageUrl:
              'https://s.pvcliping.com/web/public_image/SafePal_x288.png',
            tondns: '',
            aboutUrl: 'https://www.safepal.com',
            universalLink: 'https://link.safepal.io/ton-connect',
            jsBridgeKey: 'safepalwallet',
            bridgeUrl: 'https://ton-bridge.safepal.com/tonbridge/v1/bridge',
            platforms: ['ios', 'android', 'chrome', 'firefox'],
          },
          {
            appName: 'tonwallet',
            name: 'TON Wallet',
            imageUrl: 'https://wallet.ton.org/assets/ui/qr-logo.png',
            aboutUrl:
              'https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd',
            universalLink: 'https://wallet.ton.org/ton-connect',
            jsBridgeKey: 'tonwallet',
            bridgeUrl: 'https://bridge.tonapi.io/bridge',
            platforms: ['chrome', 'android'],
          },
        ],
      }}
      actionsConfiguration={{
        twaReturnUrl: 'https://t.me/DemoDappWithTonConnectBot/demo',
      }}
    >
      <App />
    </TonConnectUIProvider>
  </React.StrictMode>
)
