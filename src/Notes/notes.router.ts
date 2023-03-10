import express from "express"
import expressAsyncHandler from "express-async-handler"
import DMS from "../Dams/Dms"
import crypto from "crypto"

const router = express.Router()

router.get(
  "/notes",
  expressAsyncHandler(async (req, res) => {
    const notes = await DMS.getNotes()
    res.status(200).json(notes)
  })
)

router.post(
  "/note",
  expressAsyncHandler(async (req, res) => {
    const id = crypto.randomUUID()
    const { title, content, user_id } = req.body
    if (!title || !content || !user_id) {
      throw new Error("Invalid Input")
    }

    const notes = await DMS.createNote({ title, content, user_id, id })

    if (notes.length === 0) {
      throw new Error("Note Not Created")
    }

    res.status(201).json(notes)
  })
)

export default router
