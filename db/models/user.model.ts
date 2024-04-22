import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  images: [String],
});

// const connection = mongoose.createConnection(process.env.MONGODB_URL!);
// const UserModel = connection.model('User', userSchema);
const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

// export type UserModel = typeof userSchema;
export default UserModel;
