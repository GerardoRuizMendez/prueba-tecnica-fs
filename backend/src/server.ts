import express from "express";
import userRouter from "./modules/users/application/route/users.router";
import authRouter from "./modules/auth/application/route/auth.router";
import cors from "cors";

const server = express();
server.set("port", 3000);
server.use(cors());
server.use(express.json());

//Router
server.use(userRouter);
server.use(authRouter);

export default server;
