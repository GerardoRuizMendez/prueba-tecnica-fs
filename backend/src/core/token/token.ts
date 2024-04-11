import Jwt, { JwtPayload } from "jsonwebtoken";

export class authToken {
  makeAccessToken(id: string, email: string): string {
    const AccessToken: string = Jwt.sign(
      { id, email },
      process.env.SECRET || "placeholderToken",
      { expiresIn: 60 * 60 }
    );

    return AccessToken;
  }

  decodedAccessToken(token: string): string {
    const decodedToken = Jwt.decode(token) as JwtPayload;

    return decodedToken.id;
  }

  verifyAccessToken(token: string): boolean {
    try {
      Jwt.verify(token, process.env.SECRET || "placeholderToken");

      return true;
    } catch {
      return false;
    }
  }
}
