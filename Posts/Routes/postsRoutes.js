import express from 'express';
import { createPostController } from '../controllers/postController.js';
 const router = express.Router()

router.post('/createPosts', createPostController)

export default router;