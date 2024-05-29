import Notification from '../models/notificationModel.js'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import { v2 as cloudinary } from 'cloudinary'

const getUserProfile = async (req, res) => {
  const { username } = req.params

  try {
    const user = await User.findOne({ username }).select('-password')
    if (!user) return res.status(404).json({ error: 'User not found' })

    return res.status(200).json(user)
  } catch (error) {
    console.log('Error in getUserProfile: ', error.message)
    return res.status(500).json({ error: error.message })
  }
}

const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params
    const userModify = await User.findById(id)
    const currentUser = await User.findById(req.user._id)

    if (id === req.user._id.toString()) return res.status(400).json({
      error: `You can't follow/unfollow yourself`
    })

    if (!userModify || !currentUser) return res.status(400).json({ error: 'User not found' })

    const isFollowing = currentUser.following.includes(id)
    if (isFollowing) {
      // Unfollow the user
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } })
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } })
      return res.status(200).json({ message: 'User unfollowed successfully' })
    } else {
      // Follow the user
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } })
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } })

      const newNotification = new Notification({
        type: 'follow',
        from: req.user._id,
        to: userModify._id
      })

      await newNotification.save()

      return res.status(200).json({ message: 'User followed successfully' })
    }

  } catch (error) {
    console.log('Error in followUnfollowUser: ', error.message)
    return res.status(500).json({ error: error.message })
  }
}

const getSuggestUsers = async (req, res) => {
  try {
    const userId = req.user._id

    const usersFollowedByMe = await User.findById(userId).select('following')

    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId }
        }
      },
      { $sample: { size: 10 } }
    ])

    const filteredUsers = users.filter(user => !usersFollowedByMe.following.includes(user._id))

    const suggestedUsers = filteredUsers.slice(0, 4)

    suggestedUsers.forEach(user => user.password = null)

    res.status(200).json(suggestedUsers)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const updateUserProfile = async (req, res) => {
  const { fullName, email, username, currentPassword, newPassword, bio, link } = req.body
  let { profileImg, coverImg } = req.body

  const userId = req.user._id

  try {
    let user = await User.findById(userId)
    if (!user) return res.status(400).json({ error: 'User not found' })

    const existsEmail = await User.findOne({ email, _id: { $ne: user._id } })
    if (existsEmail) return res.status(400).json({ error: 'Email is already in use' })

    const existsUsername = await User.findOne({ username, _id: { $ne: user._id } })
    if (existsUsername) return res.status(400).json({ error: 'Username is already in use' })

    if ((!newPassword && currentPassword) || (!currentPassword && newPassword)) return res.status(400).json({ error: 'Please provide both current password and new password' })

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password)
      if (!isMatch) return res.status(400).json({ error: 'Current password is incorrect' })
      if (newPassword.length < 6) return res.status(500).json({ error: 'Password must be at latest 6 characters long' })

      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(newPassword, salt)
    }

    if (profileImg) {
      if (user.profileImg) {
        // https://res.cloudinary.com/dfjcdqdod/image/upload/v1716950812/cld-sample-5.jpg
        await cloudinary.uploader.destroy(user.profileImg.split('/').pop().split('.')[0])
      }
      const uploadedResponse = await cloudinary.uploader.upload(profileImg)
      profileImg = uploadedResponse.secure_url
    }

    if (coverImg) {
      if (user.coverImg) {
        await cloudinary.uploader.destroy(user.coverImg.split('/').pop().split('.')[0])
      }
      const uploadedResponse = await cloudinary.uploader.upload(coverImg)
      coverImg = uploadedResponse.secure_url
    }

    user.fullName = fullName || user.fullName
    user.email = email || user.email
    user.username = username || user.username
    user.bio = bio || user.bio
    user.link = link || user.link
    user.profileImg = profileImg || user.profileImg
    user.coverImg = coverImg || user.coverImg

    user = await user.save()
    user.password = null
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export default {
  getUserProfile,
  followUnfollowUser,
  getSuggestUsers,
  updateUserProfile
}