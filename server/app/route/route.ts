import { Elysia, t } from "elysia";
import { CreateTest, CreateUser } from "../controller/createUser";

export const router = new Elysia()
    .post("/createTest", ({ body }) => CreateTest(body), {
        body: t.Object({
            name: t.String(),
            avatar: t.File(),
        })
    }).post("/CreateUser", ({ body }) => CreateUser(body), {
        body: t.Object({
            name: t.String(), 
            email: t.String(), 
            password: t.String(),
            avatar: t.File(),
        })
    })