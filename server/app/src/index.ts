import { Elysia } from "elysia";
import {config} from "dotenv";
import connectDB from "../config/connectDB";
import { router } from "../route/route";
// import { LoginRouter } from "../route/login";

config();

const currentPort = process.env.PORT || 3000;
console.log(`Port is running at ${currentPort}`)

const app = new Elysia()

app.use(router);
// app.use(LoginRouter);

connectDB().then(()=>{
  app.listen(currentPort, ()=>{
    console.log(`DB RUNNING.`)
  });
});