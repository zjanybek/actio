import {
  useTonConnectUI,
  useTonWallet,
  TonConnectButton,
} from '@tonconnect/ui-react'
// import { Address } from '@ton/core'
import { useCallback, useEffect, useState } from 'react'
import { TonApiService } from '@/services/tonApiService.js'
import { beginCell, toNano } from '@ton/ton'
import { useNavigate } from 'react-router-dom'

import './style.scss'
import Items from './Items'
import { getFromLocalStorage } from '../../../utils/localStorage'

const body = beginCell()
  .storeUint(0, 32)
  .storeStringTail('CreateEvent')
  .endCell()

const transaction = {
  validUntil: Date.now() + 1000000,
  messages: [
    {
      address: 'EQCAJAcalEOob106aMBAoSG8-Cc--xBo879RFQjfRjtC9xgu',
      amount: toNano(0.05).toString(),
      payload: body.toBoc().toString('base64'),
    },
  ],
}

const HomeScreen = ({}) => {
  const [data, setData] = useState({})
  const [user, setUser] = useState(getFromLocalStorage('userData'))

  const wallet = useTonWallet()

  const [tonConnectUI] = useTonConnectUI()

  const navigate = useNavigate()

  const handleClick = useCallback(async () => {
    if (!wallet) {
      return
    }

    const account = wallet.account

    const client = TonApiService.create(account.chain)
    const response = await client.getAccountInfo(account.address)
    console.log(response)

    setData(response)
  }, [wallet])

  return (
    <div className='main-block'>
      <div className='main-block__container'>
        <div className='main-block__top'>
          <div className='main-block__top-text'>
            {user
              ? 'Join events or create your own right here!'
              : 'Connect your wallet and register for events or create events'}
          </div>

          {user && (
            <div className='main-block__actions'>
              <button
                onClick={() => navigate('/create-event')}
                className='button'
              >
                Create Event
              </button>
              <button
                onClick={() => navigate('/create-event')}
                className='button button_border'
              >
                My Events
              </button>
            </div>
          )}
        </div>

        <div className='main-block__body'>
          <Items />
        </div>

        {/* <div className='main-block__bottom'>
          <button className='main-block__show-more-button button'>
            Show More
          </button>
        </div> */}

        <TonConnectButton className='connect-ton-wallet-button' />

        <div className='main-block__just'>
          <div>{JSON.stringify(document.baseURI.replace(/\/$/, ''))}</div>
          <hr />

          <button onClick={() => tonConnectUI.openModal()}>open</button>
          <button onClick={() => tonConnectUI.disconnect()}>disconnect</button>

          <button onClick={() => handleClick()}>
            Call backend getAccountInfo()
          </button>

          <button onClick={() => tonConnectUI.sendTransaction(transaction)}>
            Send transaction
          </button>
        </div>

        <div>{data ? JSON.stringify(data) : null}</div>
        <div>{wallet ? JSON.stringify(wallet) : null}</div>
      </div>
    </div>
  )
}

export default HomeScreen
