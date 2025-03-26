import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Provide username"]
    },
    email:{
        type: String,
        required: [true, "Provide password"]
    },
    password:{
        type: String,
        required: [true, "Provide username"]
    },
    avatar:{
        type: String,
        default: "",
    },
    staus:{
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
    },
    verifyEmail:{
        type: Boolean,
        default: false,
    },
    passwordOTP:{
        type: String,
        default: null,
    },
    otpExpire:{
        type: Date,
        default: "",
    },
},{
    timestamps: true,
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;