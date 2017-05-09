import Quote from '../models/quote';

export const createQuote = (req, res, next) => {
  res.json({ message: 'create route is connected' });
};

export const getQuotes = (req, res, next) => {
  Quote.find({})
    .sort('-created_at')
    .then((posts) => {
      res.json(posts.map((post) => { return post.getJSON(); }));
    })
    .catch((error) => { next(error); });
};

export const deleteQuote = (req, res, next) => {
  res.json({ message: 'delete route is connected' });
};
