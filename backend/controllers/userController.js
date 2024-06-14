const User = require('../models/user')

exports.checkWallet = async (req, res) => {
  const { wallet_address } = req.query
  const user = await User.findOne({ wallet_address })
  res.json({ exist: !!user })
}

exports.register = async (req, res) => {
  const { wallet_address } = req.body

  try {
    let user = await User.findOne({ wallet_address })

    if (!user) {
      user = new User({ wallet_address })
      await user.save()
    }

    res.json({ wallet_address: user.wallet_address, id_user: user._id })
  } catch (error) {
    console.log(error)
    res.json({ status: 400 })
  }
}

exports.login = async (req, res) => {
  const { wallet_address } = req.body
  const user = await User.findOne({ wallet_address })

  if (user) {
    res.json({ wallet_address: user.wallet_address, id_user: user._id })
  } else {
    res.status(404).json({ message: 'User not found' })
  }
}
