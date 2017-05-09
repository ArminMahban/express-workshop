import Quote from '../models/quote';

export const createQuote = (req, res, next) => {
  const newQuote = new Quote(req.body);

  newQuote.save()
    .then((post) => {
      res.json({ message: 'post created' });
    })
    .catch((error) => { next(error); });
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
  Quote.findById(req.params.id)
    .then((post) => post.remove()) // eslint-disable-line
    .then(() => { res.sendStatus(200); })
    .catch((error) => { next(error); });
};
