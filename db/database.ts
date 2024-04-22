import mongoose from 'mongoose';

export const getDatabase = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URL) {
    return console.log('MONGODB_URL not found');
  }

  try {
    const client = await mongoose.connect(process.env.MONGODB_URL);
  } catch (error) {
    console.log(error);
  }
};
