import { Router } from 'express';
import * as Quotes from './controllers/quote';

const router = Router();

router.route('/posts/:id')
  .delete(Quotes.deleteQuote);

router.route('/posts')
  .get(Quotes.getQuotes)
  .post(Quotes.createQuote);

export default router;
