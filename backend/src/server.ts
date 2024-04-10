import express from "express";
import userRouter from "./modules/users/application/route/users.router";
import authRouter from "./modules/auth/application/route/auth.router";

const server = express();
server.set("port", 3000);
server.use(express.json());

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

//Router
server.use(userRouter);
server.use(authRouter);

export default server;
