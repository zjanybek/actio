import { RouterProvider } from 'react-router-dom'
import { router } from './router/router.jsx'
import {
  useIsConnectionRestored,
  useTonConnectUI,
  useTonWallet,
} from '@tonconnect/ui-react'
import { useEffect } from 'react'
import { checkWallet, login, register } from './services/userService.js'
import {
  getFromLocalStorage,
  resetLocalStorage,
  setToLocalStorage,
} from './utils/localStorage.js'

function App() {
  const wallet = useTonWallet()
  const [tonConnectUI] = useTonConnectUI()

  useEffect(() => {
    tonConnectUI.onStatusChange(async wallet => {
      if (!wallet) {
        tonConnectUI.disconnect()
        resetLocalStorage()
        return
      }

      if (wallet.account.address) {
        const walletAddress = wallet.account.address

        const userData = getFromLocalStorage('userData')
        if (userData && userData.wallet_address === walletAddress) {
          const { id_user } = userData
          console.log(id_user)
          return
        } else {
          try {
            const response = await checkWallet(walletAddress)

            if (response.data.exist) {
              const loginResponse = await login(walletAddress)
              setToLocalStorage('userData', loginResponse.data)
            } else {
              const registerResponse = await register(walletAddress)
              setToLocalStorage('userData', registerResponse.data)
            }
          } catch (error) {
            console.error('Error during wallet check/register:', error)
          }
        }
      }
    })
  }, [tonConnectUI])

  return (
    <>
      <RouterProvider router={router} />
      <div id='modal'></div>
    </>
  )
}

export default App
