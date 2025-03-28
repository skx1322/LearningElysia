// import { jwt } from "@elysiajs/jwt";
// import { Elysia } from "elysia";
// import dotenv from "dotenv";
// import { cookie } from "@elysiajs/cookie";
// dotenv.config();

// export const auth = new Elysia()
//     .use(cookie())
//     .use(
//         jwt({
//             name: "jwt",
//             secret: process.env.TOKEN_KEY || "ChirpChirpNerdanta",
//             exp: "1h",
//         })
//     )
//     .derive(async ({ jwt, cookie }) => {
//         const token = cookie?.token?.value;
//         if (!token) return { user: null };

//         try {
//             const user = await jwt.verify(token);
//             return { user }; // Attach `user` to the context
//         } catch {
//             return { user: null };
//         }
//     });
