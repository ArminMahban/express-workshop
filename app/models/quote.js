import mongoose, { Schema } from 'mongoose';

const QuoteSchema = new Schema({
  created_at: { type: Date, default: new Date() },
  author: String,
  text: String,
});

QuoteSchema.methods.getJSON = function preview() {
  return {
    id: this._id,
    author: this.author,
    text: this.text,
  };
};

// create model class
const QuoteModel = mongoose.model('Quote', QuoteSchema);

export default QuoteModel;
