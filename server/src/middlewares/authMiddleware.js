import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.status(401).json({ error: 'Unauthorized: No token provided' })

    jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
      if (err) return res.status(401).json({ error: 'Unthorized: Invalid token' })
      const user = await User.findById(data.userId).select('-password')
      if (!user) return res.status(404).json({ error: 'User not found' })
      req.user = user._doc
      next()
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}