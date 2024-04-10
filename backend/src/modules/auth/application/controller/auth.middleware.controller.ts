import { NextFunction, Request, Response } from "express";
import { authToken } from "../../../../core/token/token";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export class AuthMiddlewareController {
  private token: authToken;
  constructor() {
    this.token = new authToken();
  }

  async checkToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({ error: "Authorization needed" });
      return;
    }

    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      res.status(400).json({ error: "Invalid Token format" });
      return;
    }

    const tokenValidity = this.token.verifyAccessToken(tokenParts[1]);
    if (!tokenValidity) {
      res.status(403).json({ error: "Invalid access token" });
      return;
    }

    req.userId = tokenParts[1];
    next();
  }
}
