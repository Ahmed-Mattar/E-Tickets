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

  static compare(storedPassword: string, suppliedPassword: string) {}
}
