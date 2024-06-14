import { axiosDefault } from '@/lib/axios.js'

export const checkWallet = walletAddress => {
  return axiosDefault.get('/check-wallet', {
    params: {
      wallet_address: walletAddress,
    },
  })
}

export const login = walletAddress => {
  return axiosDefault.post('/login', { wallet_address: walletAddress })
}

export const register = walletAddress => {
  return axiosDefault.post('/register', { wallet_address: walletAddress })
}
