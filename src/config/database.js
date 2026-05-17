import mongoose from "mongoose";
import config from "./config.js";

const connect_db = async() =>{
    try{
        await mongoose.connect(config.MONGO_URI);
        console.log("Connected to MongoDB");
    }
    catch(err){
        console.error(`Error connecting to MongoDB gave following error ${err}`);
        process.exit(1);
    }
}

export {
    connect_db
};