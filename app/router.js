import { Router } from 'express';
import * as Posts from './controllers/post';

const router = Router();

router.route('/posts/:id')
  .get(Posts.getPost)
  .put(Posts.updatePost)
  .delete(Posts.deletePost);

router.route('/posts')
  .get(Posts.getPosts)
  .post(Posts.createPost);

export default router;
