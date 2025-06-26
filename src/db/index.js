import express from "express"
import mongoose from "mongoose"
import {DB_NAME} from "../constants.js"



const connectDB = async () => {
    try{
        await mongoose.connect(`${process.env.MONGO_URL}${DB_NAME}`)
        console.log("Connected to MongoDB")
       
    }
    catch(error){
        console.error("ERROR ", error)
        process.exit(1)
    }
}

export default connectDB


/* 

const connectDB = async () => {
    try{
    await mongoose.connect("url/name ");
    
    }
    catch(error){
    }
    }

*/