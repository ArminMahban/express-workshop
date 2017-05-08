import mongoose, { Schema } from 'mongoose';

const PostSchema = new Schema({
  created_at: { type: Date, default: new Date() },
  title: String,
  cover_url: String,
  content: String,
  tags: [String],
});

PostSchema.methods.getPreview = function preview() {
  return {
    id: this._id,
    title: this.title,
    cover_url: this.cover_url,
    tags: this.tags,
  };
};

// create model class
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
