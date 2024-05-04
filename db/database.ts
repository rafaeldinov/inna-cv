import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

export const getDatabase = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect(process.env.MONGODB_URL!);
};
