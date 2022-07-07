import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { BadRequestError } from "../errors/bad-requrest-error";
import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 charactrs"),
  ],
  async (req: Request, res: Response) => {
    // check if any errors exist from running the two validator middlewares
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    // step 1 check if the email already exist
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    /*
    step 2 hashing password for security
     */

    // step 3 create new user

    const user = User.build({ email, password });
    await user.save();
    res.status(201).send(user);
    // step 4 send back a jwt/cookie
  }
);

export { router as signupRouter };
