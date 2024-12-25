'use client';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export async function connectToDB() {
    try{
        await mongoose.connect(process.env.MONGO_URL) ;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB', error.message);  
    }
}