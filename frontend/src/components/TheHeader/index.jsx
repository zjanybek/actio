import { Link, useNavigate } from 'react-router-dom'
import './style.scss'
import {
  TonConnectButton,
  useIsConnectionRestored,
  useTonConnectUI,
  useTonWallet,
} from '@tonconnect/ui-react'
import { resetLocalStorage } from '../../utils/localStorage'
import { useEffect } from 'react'

const TheHeader = () => {
  const wallet = useTonWallet()
  const connectionRestored = useIsConnectionRestored()

  const [tonConnectUI] = useTonConnectUI()
  const navigate = useNavigate()

  useEffect(() => {
    tonConnectUI.onStatusChange(async wallet => {
      if (!wallet) {
        tonConnectUI.disconnect()
        resetLocalStorage()

        // navigate('/')
        window.location.reload()

        return
      }
    })
  }, [tonConnectUI])

  return (
    <div className='header'>
      <div className='header__container'>
        <div className='header__content'>
          <Link to={`/`} className='header__logo'>
            LOGO
          </Link>

          <TonConnectButton className='connect-ton-wallet-button' />
        </div>
      </div>
    </div>
  )
}

export default TheHeader
