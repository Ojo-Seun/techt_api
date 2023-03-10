import express from "express"
import expressAsyncHandler from "express-async-handler"
import DBMS from "../Dams/Dbms"
import crypto from "crypto"
import { isAuth } from "../utils/middlewares"

const router = express.Router()

router.get(
  "/notes",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const notes = await DBMS.getNotes()
    res.status(200).json(notes)
  })
)

router.post(
  "/note",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const id = crypto.randomUUID()
    const { title, content, user_id } = req.body
    if (!title || !content || !user_id) {
      throw new Error("Invalid Input")
    }

    const result = await DBMS.createNote({ title, content, user_id, id })

    if (!result) {
      throw new Error("Note Not Created")
    }

    res.status(201).json({ message: "Note Created" })
  })
)

export default router
