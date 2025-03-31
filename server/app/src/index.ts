import { Elysia } from "elysia";
import {config} from "dotenv";
import connectDB from "../config/connectDB";
import { router } from "../route/route";
import { loginPage } from "../route/login";
import { PageComponent } from "../route/page";
import { simulation } from "../route/simulation";

config();

const currentPort = process.env.PORT || 3000;
console.log(`Port is running at ${currentPort}`)

const app = new Elysia()

app.use(simulation)
app.use(router);
app.use(loginPage);
app.use(PageComponent);

connectDB().then(()=>{
  app.listen(currentPort, ()=>{
    console.log(`DB RUNNING.`)
  });
});