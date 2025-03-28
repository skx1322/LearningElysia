// import { Elysia, t } from "elysia";
// import { cookie } from "@elysiajs/cookie";
// import { jwt } from "@elysiajs/jwt";
// import { randomUUID } from "crypto";

// const users = {
//   skx1322: "nerdanta1322",
// };

// const tokens = new Map<string, { expires: number }>();

// const app = new Elysia()
//   .use(cookie())
//   .use(
//     jwt({
//       name: "jwt",
//       secret: process.env.JWT_SECRET || "your-secret-key", // Ensure to use a strong secret in production
//     })
//   )
//   .post(
//     "/login",
//     async ({ set, cookie, body, jwt }) => {
//       if (body.name in users && users[body.name] === body.password) {
//         const token = randomUUID();
//         const expires = Date.now() + 5 * 60 * 1000; // 5 minutes

//         tokens.set(token, { expires });
//         cookie.auth = token;
//         set.cookie = {
//           auth: {
//             value: token,
//             httpOnly: true,
//             maxAge: 5 * 60, // 5 minutes in seconds
//           },
//         };

//         return { message: "Login successful" };
//       }

//       set.status = 401;
//       return { message: "Invalid credentials" };
//     },
//     {
//       body: t.Object({
//         name: t.String(),
//         password: t.String(),
//       }),
//     }
//   )
//   .get("/secret", ({ cookie, set }) => {
//     const token = cookie.auth;

//     if (token && tokens.has(token) && tokens.get(token)!.expires > Date.now()) {
//       return { secret: "This is the secret page" };
//     }

//     set.status = 401;
//     return { message: "Unauthorized" };
//   })
//   .listen(3000);

// console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);