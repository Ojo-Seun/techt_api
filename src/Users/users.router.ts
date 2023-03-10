import express from "express"
import expressAsyncHandler from "express-async-handler"
const router = express.Router()
import DMS from "../Dams/Dms"
import { Users } from "../utils/type"
import crypto from "crypto"
import bcrypt from "bcrypt"

router.post(
  "/sign_up",
  expressAsyncHandler(async (req, res) => {
    const db = await DMS.readFromDb()
    const users: Users = db["users"]
    const { name, email, isAdmin, password } = req.body

    // Validate Inputs
    if (!name || !email || password) {
      throw new Error("Invalid Input")
    }

    const user = users.find((x) => x.email === email)
    if (user) {
      throw new Error(`User With ${email} Already Exist`)
    }

    const user_id = crypto.randomUUID()

    const newUser = { name, email, isAdmin: isAdmin || false, password: bcrypt.hashSync(password, 12), user_id }
  })
)

export default router
