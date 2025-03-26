import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Provide username"]
    },
    avatar:{
        type: String,
        required: [true, "Provide image"]
    },
},{
    timestamps: true,
});

const UserModel = mongoose.model("User", userSchema)