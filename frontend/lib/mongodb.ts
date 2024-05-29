import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  if (mongoose.connection?.readyState === 1) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to db', error);
  }
};
