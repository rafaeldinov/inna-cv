import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    area: { type: String, required: true },
    previewImageSrc: { type: String, required: true },
    description: { type: String, required: true },
    images: [String],
    items: [
      {
        type: { type: String, required: true },
        text: { type: String, required: false },
        src: { type: String, required: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// const connection = mongoose.createConnection(process.env.MONGODB_URL!);
// const PostModel = connection.model('Post', postSchema);
const PostModel = mongoose.models.Post || mongoose.model('Post', postSchema);

// export type PostType = typeof postSchema;
export default PostModel;
