import { Address, TonClient4 } from '@ton/ton'
import { CHAIN } from '@tonconnect/ui-react'

export class TonApiService {
  static create(chain) {
    let client

    if (chain === CHAIN.MAINNET) {
      client = new TonClient4({
        endpoint: 'https://mainnet-v4.tonhubapi.com',
      })
    } else if (chain === CHAIN.TESTNET) {
      client = new TonClient4({
        endpoint: 'https://testnet-v4.tonhubapi.com',
      })
    } else {
      throw new Error('Invalid chain type')
    }

    return new TonApiService(client)
  }

  constructor(client) {
    this.client = client
  }

  async getAccountInfo(address) {
    const masterAt = await this.client.getLastBlock()
    return await this.client.getAccount(
      masterAt.last.seqno,
      Address.parse(address)
    )
  }
}
