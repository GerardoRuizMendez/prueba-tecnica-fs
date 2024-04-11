import { Router } from "express";
import UserController from "../controller/user.controller";
import { AuthMiddlewareController } from "../../../auth/application/controller/auth.middleware.controller";

const userRouter: Router = Router();
const userController = new UserController();

const authMiddlewareController = new AuthMiddlewareController();

userRouter.get(
  "/api/v1/all-users",
  async (req, res, next) => {
    authMiddlewareController.checkToken(req, res, next);
  },
  (req, res) => {
    userController.getAllUsers(req, res);
  }
);

userRouter.get(
  "/api/v1/get-roles",
  async (req, res, next) => {
    authMiddlewareController.checkToken(req, res, next);
  },
  (req, res) => {
    userController.getRoles(req, res);
  }
);

userRouter.get(
  "/api/v1/get-current-user",
  async (req, res, next) => {
    authMiddlewareController.checkToken(req, res, next);
  },
  (req, res) => {
    userController.getCurrentUser(req, res);
  }
);

userRouter.post(
  "/api/v1/create-user",

  (req, res) => {
    userController.createUser(req, res);
  }
);

userRouter.put(
  "/api/v1/update/:id",
  async (req, res, next) => {
    authMiddlewareController.checkToken(req, res, next);
  },
  (req, res) => {
    userController.updateUser(req, res);
  }
);

userRouter.delete(
  "/api/v1/delete/:id",
  async (req, res, next) => {
    authMiddlewareController.checkToken(req, res, next);
  },
  (req, res) => {
    userController.deleteUser(req, res);
  }
);

export default userRouter;
