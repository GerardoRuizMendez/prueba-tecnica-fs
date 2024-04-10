import * as crypto from "crypto";

export class cryptoStrategy {
  constructor() {}

  encrypt(target: string): string {
    const secret = process.env.CRYPTO_TOKEN || "placeholderCrypto";
    const salt = Buffer.from(
      process.env.SECRET_SALT_TOKEN || "^G#z1K]@m<5*yYTk",
      "utf8"
    );
    const key = crypto.pbkdf2Sync(secret, salt, 100000, 32, "sha256");

    const algorithm = "aes-256-cbc";
    const iv = Buffer.from(
      process.env.SECRET_SALT_TOKEN || "^G#z1K]@m<5*yYTk",
      "utf8"
    );

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    let encrypted: string = cipher.update(target, "utf8", "hex");
    encrypted += cipher.final("hex");

    return encrypted;
  }

  decrypt(target: string): string {
    try {
      const secret = process.env.SECRET_TOKEN || "placeholderCrypto";
      const salt = process.env.SECRET_SALT_TOKEN || "^G#z1K]@m<5*yYTk";
      const key = crypto.pbkdf2Sync(secret, salt, 100000, 32, "sha256");

      const algorithm = "aes-256-cbc";
      const iv = Buffer.from(
        process.env.SECRET_SALT_TOKEN || "^G#z1K]@m<5*yYTk",
        "utf8"
      );

      const decipher = crypto.createDecipheriv(algorithm, key, iv);

      let decrypted = decipher.update(target, "hex", "utf8");
      decrypted += decipher.final("utf8");

      return decrypted;
    } catch (error) {
      console.error("Error during decryption:", error);
      throw error;
    }
  }
}
