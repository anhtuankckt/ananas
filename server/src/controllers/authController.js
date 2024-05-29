import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { validateEmail } from '../utils/helper.js'

const signup = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body

    if (!validateEmail(email)) return res.status(400).json({ error: 'Invalid email format' })

    const existingUser = await User.findOne({ username })
    if (existingUser) return res.status(400).json({ error: 'Username is already taken' })

    const existingEmail = await User.findOne({ email })
    if (existingEmail) return res.status(400).json({ error: 'Email is already taken' })

    if (password?.length < 6) return res.status(400).json({ error: 'Password must be at latest 6 characters long' })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword
    })

    if (newUser) {
      const token = jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET,
        { expiresIn: '3h' })

      await newUser.save()
      newUser.password = null
      return res.status(201).json({
        ...newUser._doc,
        token
      })
    } else {
      return res.status(400).json({ error: 'Invalid user data' })
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || '')

    if (!user || !isPasswordCorrect) return res.status(400).json({ error: 'Invalid username or password' })

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '3h' })

    user.password = null

    return res.status(200).json({
      ...user._doc,
      token
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const logout = async (req, res) => {
  try {
    res.status(200).json({ message: 'Logged out successfully', token: undefined })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getMe = async (req, res) => {
  try {
    const user = req.user
    return res.json({ ...user })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export default { signup, login, logout, getMe }
