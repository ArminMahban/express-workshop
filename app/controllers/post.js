import Post from '../models/post';

export const createPost = (req, res) => {
  const newPost = new Post(req.body);

  newPost.save()
    .then((post) => {
      res.json({ message: 'post created' });
    })
    .catch((error) => { res.status(500).json({ error }); });
};

export const getPosts = (req, res, next) => {
  Post.find({})
    .sort('-created_at')
    .then((posts) => {
      res.json(posts.map((post) => { return post.getPreview(); }));
    })
    .catch((error) => { res.status(500).json({ error }); });
};

export const getPost = (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      res.json(post);
    })
    .catch((error) => { res.status(500).json({ error }); });
};

export const deletePost = (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => post.remove()) // eslint-disable-line
    .then(() => { res.sendStatus(200); })
    .catch((error) => { res.status(500).json({ error }); });
};

export const updatePost = (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      post.content = req.body.content;
      post.cover_url = req.body.cover_url;
      post.tags = req.body.tags;
      post.title = req.body.title;

      return post.save();
    })
    .then((post) => { return res.json(post); })
    .catch((error) => { res.status(500).json({ error }); });
};
