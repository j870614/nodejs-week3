import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

const DB = process.env.DATABASE!.replace(
  '<password>',
  process.env.DATABASE_PASSWORD!,
);
// const DB: string = 'mongodb://127.0.0.1:27017/post' //本地資料庫

const connectToDatabase = async () => {
  try {
    console.log('資料庫連線中...');
    await mongoose.connect(DB);
    console.log('資料庫連線成功');
  } catch (error) {
    console.log('資料庫連線失敗');
  }
};

connectToDatabase();