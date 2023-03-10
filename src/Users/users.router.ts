import express from "express"
import expressAsyncHandler from "express-async-handler"
const router = express.Router()
import DBMS from "../Dams/Dbms"
import { Users } from "../utils/type"
import crypto from "crypto"
import bcrypt from "bcrypt"
import { generateToken } from "../utils/utils"

router.post(
  "/sign_up",
  expressAsyncHandler(async (req, res) => {
    const db = await DBMS.readFromDb()
    const users: Users = db["users"]
    const { name, email, isAdmin, password } = await req.body

    // Validate Inputs
    if (!name || !email || !password) {
      throw new Error("Invalid Input")
    }

    const user = users.find((x) => x.email === email)
    if (user) {
      throw new Error(`User With ${email} Already Exist`)
    }

    const user_id = crypto.randomUUID()

    const newUser = { name, email, isAdmin: isAdmin || false, password: bcrypt.hashSync(password, 12), user_id }

    const result = await DBMS.createUser(newUser)

    if (result.name) {
      res.status(201).json({ ...result, Token: generateToken(result) })
    } else {
      throw new Error("User Not Created")
    }
  })
)

router.post(
  "/sign_in",
  expressAsyncHandler(async (req, res) => {
    const db = await DBMS.readFromDb()
    const { email, password } = await req.body
    if (!email || !password) {
      throw new Error("email or password is missing")
    }

    const users: Users = db["users"]
    const user = users.find((x) => x.email === email)

    if (!user?.email) {
      throw new Error("Invalid Email Please Sign UP")
    }

    const result = await bcrypt.compare(password, user.password)

    if (!result) {
      throw new Error("Invalid Password")
    }

    const { isAdmin, user_id, name } = user

    res.status(200).json({ user_id, isAdmin, Token: generateToken({ isAdmin, user_id, email, name }) })
  })
)

export default router
