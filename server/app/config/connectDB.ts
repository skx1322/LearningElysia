import mongoose from "mongoose";
import { config } from "dotenv";

config();

if(!process.env.DB_KEY){
    console.log("Missing DB Key")
};

async function connectDB(){
    try {
        const DB_KEY = process.env.DB_KEY;

        if(!DB_KEY){
            throw new Error("DB KEY IS MISSING");
        };

        await mongoose.connect(DB_KEY);
        console.log("Connected to DB");
    } catch (error) {
        console.log("Server Issue", error);
        process.exit(1);
    }
}

export default connectDB;