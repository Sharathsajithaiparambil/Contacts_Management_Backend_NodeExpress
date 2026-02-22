import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.CONNECTION_STRING) {
      throw new Error('CONNECTION_STRING is not defined in environment variables');
    }
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log('MongoDB connected successfully', connect.connection.host, connect.connection.name);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('MongoDB connection failed:', errorMessage);
    process.exit(1);
  }
};

export default connectDB;

