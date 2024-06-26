import Post from '../models/postModel.js'
import User from '../models/userModel.js'
import { v2 as cloudinary } from 'cloudinary'
import Notification from '../models/notificationModel.js'

const createPost = async (req, res) => {
  try {
    const { text } = req.body
    let { img } = req.body
    const userId = req.user._id

    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ error: 'User not found' })

    if (!text.trim() && !img) return res.status(400).json({ error: 'Post must have text or image' })

    if (img) {
      const uploadResponse = await cloudinary.uploader.upload(img)
      img = uploadResponse.secure_url
    }

    const newPost = new Post({
      user: userId,
      text: text.trim(),
      img
    })

    await newPost.save()
    res.status(201).json(newPost)
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ error: 'Post not found' })

    if (post.user.toString() !== req.user._id.toString()) return res.status(401).json({ error: 'You are not authorized to delete this post' })

    if (post.img) {
      const imgId = post.img.split('/').pop().split('.')[0]
      await cloudinary.uploader.destroy(imgId)
    }

    await Post.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: 'Post deleted successfully' })
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const commentOnPost = async (req, res) => {
  try {
    const { text } = req.body
    const postId = req.params.id
    const userId = req.user._id

    if (!text.trim()) return res.status(400).json({ error: 'Text field is required' })

    let post = await Post.findById(postId)
    if (!post) return res.status(404).json({ error: 'Post not found' })

    const comment = { user: userId, text: text.trim() }

    post.comments.push(comment)
    await post.save()

    post = await Post.findById(postId)
      .populate({
        path: 'user',
        select: '-password'
      })
      .populate({
        path: 'comments.user',
        select: '-password'
      })

    res.status(201).json(post)
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const likeUnlikePost = async (req, res) => {
  try {
    const userId = req.user._id
    const { id: postId } = req.params

    const post = await Post.findById(postId)
    if (!post) return res.status(404).json({ error: 'Post not found' })

    const userLikePost = post.likes.includes(userId)

    if (userLikePost) {
      // Unlike post
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } })
      await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } })

      const updatedLikes = post.likes.filter(id => id.toString() !== userId.toString())

      return res.status(200).json(updatedLikes)
    } else {
      // Like post
      post.likes.push(userId)
      await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } })
      await post.save()

      const nofification = new Notification({
        from: userId,
        to: post.user,
        type: 'like'
      })
      await nofification.save()

      const updatedLikes = post.likes

      return res.status(200).json(updatedLikes)
    }
  } catch (error) {
    return res.status(500).json({ erorr: 'Internal serevr error' })
  }
}

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({
        path: 'user',
        select: '-password'
      })
      .populate({
        path: 'comments.user',
        select: '-password'
      })

    if (posts.length === 0) return res.status(200).json([])

    res.status(200).json(posts)
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const getLikedPosts = async (req, res) => {
  const userId = req.params.id

  try {
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ error: 'User not found' })

    const likedPosts = await Post.find({ _id: { $in: user.likedPosts } }).populate({
      path: 'user',
      select: '-password'
    }).populate({
      path: 'comments.user',
      select: '-password'
    })

    res.status(200).json(likedPosts)
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const getFollowingPosts = async (req, res) => {
  try {
    const userId = req.user._id
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ error: 'User not found' })

    const following = user.following

    const feedPosts = await Post.find({ user: { $in: following } })
      .sort({ createdAt: -1 })
      .populate({
        path: 'user',
        select: '-password'
      })
      .populate({
        path: 'comments.user',
        select: '-password'
      })

    res.status(200).json(feedPosts)
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

const getUserPosts = async (req, res) => {
  try {
    const { username } = req.params
    const user = await User.findOne({ username })
    if (!user) return res.status(404).json({ error: 'User not found' })

    const posts = await Post.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: 'user',
        select: '-password'
      })
      .populate({
        path: 'comments.user',
        select: '-password'
      })

    res.status(200).json(posts)
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export default {
  createPost,
  likeUnlikePost,
  commentOnPost,
  deletePost,
  getAllPosts,
  getLikedPosts,
  getFollowingPosts,
  getUserPosts
}