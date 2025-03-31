import { Elysia, t } from "elysia";
import { html, Html } from '@elysiajs/html'
import { jwt } from "@elysiajs/jwt";
import UserModel from "../model/user.model";
import bcrypt from "bcryptjs"
import imageUploadCall from "../middleware/cloudinary";
import dotenv from "dotenv";

dotenv.config();

export const loginPage = new Elysia()
    .use(jwt({
        name: 'jwt',
        secret: process.env.TOKEN_SECRET || "Nerdanta",
        exp: "1d",
    }))

    .post("/LoginAccount", async ({ body, jwt, cookie: { auth }, set }) => {
        try {
            const { email, password } = body;
            if (!body) {
                set.status = 400;
                return {
                    success: false,
                    message: "Missing email or password."
                };
            }
            const userFind = await UserModel.findOne({
                email,
            })
            if (!userFind) {
                set.status = 400;
                return {
                    success: false,
                    message: "User not found."
                }
            }
            const passwordChecker = await bcrypt.compare(password, userFind.password);
            if (!passwordChecker) {
                set.status = 401;
                return {
                    success: false,
                    message: "Incorrect password."
                }
            }
            const ID = userFind._id.toString();
            const cookieToken = await jwt.sign({ ID });

            auth.set({
                value: cookieToken,
                httpOnly: true,
                secure: true,
                maxAge: 24 * 3600,
            });
            set.status = 200;

            return {
                success: true,
                message: "Successfully login.",
                output: userFind.username,
            };
        } catch (error) {
            set.status = 500;
            return {
                success: true,
                message: "Server encountered an issue.",
                output: error,
            };
        }
    }, {
        body: t.Object({
            email: t.String(),
            password: t.String(),
        })
    })

    .post("/Logout", async ({ jwt, cookie: { auth }, set }) => {
        try {
            const checkerAuth = await jwt.verify(auth.value);
            if (!checkerAuth) {
                set.status = 401;
                return {
                    success: false,
                    message: "Unauthorized",
                }
            };
            auth.remove();
            set.status = 200;
            return {
                success: true,
                message: "Successfully logout."
            }
        } catch (error) {
            set.status = 500;
            return {
                success: false,
                message: "Server encountered an issue."
            }
        }
    })

    .post("/ExtendCookie", async ({ jwt, cookie: { auth }, set }) => {
        const oldToken = auth.value;
        const authChecker = await jwt.verify(oldToken);
        if (!authChecker) {
            set.status = 401;
            return {
                success: false,
                message: "Invalid or expired token.",
            };
        }
        const id = authChecker.ID
        const newToken = await jwt.sign({ id })
        auth.set({
            value: newToken,
            httpOnly: true,
            secure: true,
            maxAge: 24 * 3600,
        })

        return {
            success: true,
            message: "Token renewed."
        }
    })

    .put("/UpdateAccount", async ({ body, jwt, cookie: { auth }, set }) => {
        const checkerAuth = await jwt.verify(auth.value)
        if (!checkerAuth) {
            set.status = 401;
            return {
                success: false,
                message: "Unauthorized access."
            }
        }
        try {
            const { name, email, avatar } = body;
            const id = checkerAuth.ID;
            const userFind = await UserModel.findById(id);
            if (!userFind) {
                set.status = 400;
                return {
                    sucess: false,
                    message: "No account found."
                };
            }
            let updatedAvatar = userFind.avatar;
            if (avatar) {
                const upload: any = await imageUploadCall(avatar);
                updatedAvatar = upload.url;
            }
            const updatedPayload = {
                username: name || userFind.username,
                email: email || userFind.email,
                avatar: updatedAvatar || userFind.avatar,
            }
            const updateUser = await UserModel.findByIdAndUpdate(id, updatedPayload, { new: true })

            set.status = 200;
            return {
                success: true,
                message: "Successfully updated user.",
                output: updateUser,
            }
        } catch (error) {
            set.status = 400;
            return {
                success: false,
                message: "Something went wrong in the server.",
                output: error,
            }
        }
    }, {
        body: t.Object({
            name: t.Optional(t.String()),
            email: t.Optional(t.String()),
            avatar: t.Optional(t.File()),
        })
    })