import express from 'express'
import postController from '../controllers/postController.js'
import { authenticateToken } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.get('/all', authenticateToken, postController.getAllPosts)

router.get('/following', authenticateToken, postController.getFollowingPosts)

router.get('/likes/:id', authenticateToken, postController.getLikedPosts)

router.get('/users/:username', authenticateToken, postController.getUserPosts)

router.post('/create', authenticateToken, postController.createPost)

router.post('/like/:id', authenticateToken, postController.likeUnlikePost)

router.post('/comment/:id', authenticateToken, postController.commentOnPost)

router.delete('/:id', authenticateToken, postController.deletePost)

export default router