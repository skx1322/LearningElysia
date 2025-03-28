import { Elysia, t } from "elysia";
import { CreateTest, CreateUser, LoginUser } from "../controller/createUser";
import { html, Html } from '@elysiajs/html'
import { jwt } from "@elysiajs/jwt";

export const router = new Elysia()
    .use(html())
    .use(jwt({
        name: 'jwt',
        secret: "Nerdanta",
        exp: "5m",
    }))
    .get("/", () => `
            <html lang='en'>
                <head>
                    <title>Hello World</title>
                </head>
                <body>
                    <h1>Elysia</h1>
                </body>
            </html>
    `)
    .post("/createTest", ({ set, body }) => CreateTest(body), {
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
    .post("/LoginUser", ({ body }) => LoginUser(body), {
        body: t.Object({
            email: t.String(),
            password: t.String(),
        })
    })
    .get("/sercret", () => `
    <html lang='en'>
        <head>
            <title>Hello World</title>
        </head>
        <body>
            <img src="https://res.cloudinary.com/dgz1kyztu/image/upload/v1742913681/typescript-project/ublwd6ry1ys0duoii2c6.png"></img>
        </body>
    </html>
`) // trying to figure out the cookie 💀
.get("/getCookieJwt/:name", async({ jwt, params: {name}, cookie: {auth} })=>{
    const value = await jwt.sign({name});
    auth.set({
        value,
        httpOnly: true,
        maxAge: 5 * 60,
    }) 
    console.log(name);
    return `Sign in as ${value}`;
},{
    params: t.Object({
        name: t.String(),
    })
})

.get("/removeCookieJwt", async({jwt, error, cookie: {auth}})=>{
    const profile = await jwt.verify(auth.value);

    if(!profile){
        return error(401, `Unauthorized`);
    }

    auth.remove()
})

 //test cookie