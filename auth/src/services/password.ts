import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class Passowrd {
  static async toHash(password: string) {
    // hashing by itself isn't enough to protect password
    // salt are appended to the end of passwords before they are hashed
    // help to defent rainbow tables attack attacks (precomputated hash)
    const salt = randomBytes(8).toString("hex");
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buf.toString("hex")}.${salt}`;
  }

  /**
   *
   * @param storedPassword  the hashed password plus the salt added in toHash
   * @param suppliedPassword  the password given by the user
   * @return Boolean
   */
  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    return buf.toString("hex") === hashedPassword;
  }
}
