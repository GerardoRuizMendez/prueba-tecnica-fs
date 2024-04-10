import { Router } from "express";
import AuthController from "../controller/auth.controller";

const authRouter: Router = Router();
const authController = new AuthController();

authRouter.post("/api/v1/login", async (req, res) => {
  authController.logIn(req, res);
});

export default authRouter;
