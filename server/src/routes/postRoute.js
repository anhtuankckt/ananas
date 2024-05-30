import express from 'express'
import postController from '../controllers/postController.js'
const router = express.Router()

router.get('/all', postController.getAllPosts)

router.get('/following', postController.getFollowingPosts)

router.get('/likes/:id', postController.getLikedPosts)

router.get('/users/:username', postController.getUserPosts)

router.post('/create', postController.createPost)

router.post('/like/:id', postController.likeUnlikePost)

router.post('/comment/:id', postController.commentOnPost)

router.delete('/:id', postController.deletePost)

export default router