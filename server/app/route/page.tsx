import { Elysia } from "elysia";
import { html, Html } from "@elysiajs/html";
import { jwt } from "@elysiajs/jwt";

export const PageComponent = new Elysia()
  .use(html())
  .use(
    jwt({
      name: "jwt",
      secret: process.env.TOKEN_SECRET || "Nerdanta",
      exp: "1d",
    })
  )
  .get("/", async ({ jwt, cookie: { auth }, set }) => {
    try {
      const authChecker = await jwt.verify(auth.value);
      if (!authChecker) {
        set.status = 401;
      }  
      set.status = 200;
      return (
        <html lang="en">
          <head>
            <title>Hello World</title>
          </head>
          <body>
            <h1>Hua</h1>
            <img src="https://res.cloudinary.com/dgz1kyztu/image/upload/v1742913681/typescript-project/ublwd6ry1ys0duoii2c6.png"></img>
          </body>
        </html>
      );
    } catch (error) {
        set.status = 401;
        return (
            <html lang="en">
              <head>
                <title>Hello World</title>
              </head>
              <body>
                <h1>Unauthorized</h1>
              </body>
            </html>
          );
    }
  });
