import express from "express"
import mongoose from "mongoose"
import {DB_NAME} from "../constants.js"
const app = express()


const connectDB = async () => {
    try{
        await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
        console.log("Connected to MongoDB")
        app.on("error" , (error) => {
            console.log("ERR: " , error);
            throw error
        })
        app.listen(process.env.PORT || 3000 , () =>{
            console.log("APP is listing on Port" , process.env.PORT )
        })
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