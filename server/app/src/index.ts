import { Elysia } from "elysia";
import {config} from "dotenv";
import connectDB from "../config/connectDB";
import { router } from "../route/route";

config();

const currentPort = process.env.PORT || 3000;
console.log(`Port is running at ${currentPort}`)

const app = new Elysia()

app.use(router);

connectDB().then(()=>{
  app.listen(currentPort, ()=>{
    console.log(`DB RUNNING.`)
  });
});