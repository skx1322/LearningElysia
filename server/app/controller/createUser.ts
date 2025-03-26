import imageUploadCall from "../middleware/cloudinary";
import bcrypt from "bcryptjs"
import UserModel from "../model/user.model";
export async function CreateTest(body: { name: string, avatar: File }) {
    try {
        const { name, avatar } = body;
        const uploadResult: any = await imageUploadCall(avatar);

        if (!uploadResult) {
            throw new Error("Failed to upload image");
        }

        const paylaod = {
            name: name,
            avatar: uploadResult.url,
        }

        return {
            success: true,
            status: 200,
            message: `Hello to ${name}`,
            output: paylaod,
        }
    } catch (error) {
        return {
            success: false,
            status: 500,
            message: "Server Error",
            output: error,
        }
    }
}

export async function CreateUser(body: { name: string, email: string, password: string, avatar: File }) {
    try {
        const {
            name, email, password, avatar
        } = body;

        if (!body) {
            return {
                success: false,
                status: 400,
                message: "Please enter name, email, password and avatar fully",
                output: body
            };
        };

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const uplaodImage: any = await imageUploadCall(avatar);

        const databasePayload = {
            username: name,
            email: email,
            password: hashPassword,
            avatar: uplaodImage.url,
        }

        const newUserCreate = new UserModel(databasePayload);
        const saveUser = await newUserCreate.save();
        return {
            success: true,
            status: 200,
            message: "User created successfully",
            output: saveUser,
        }

    } catch (error) {
        return {
            success: false,
            status: 500,
            message: "Server Error",
            output: error,
        }
    }
}
