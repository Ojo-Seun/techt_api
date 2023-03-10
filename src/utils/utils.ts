import { User } from "./type"
import jwt from "jsonwebtoken"

const generateToken = (user: Omit<User, "password">) => {
  return jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: "2d" })
}

export { generateToken }
