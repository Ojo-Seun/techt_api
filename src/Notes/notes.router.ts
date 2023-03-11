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

router.get(
  "/note/:id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id

    const note = await DBMS.getNoteById(id)
    if (note) {
      res.status(200).json(note)
    }
  })
)

router.post(
  "/create_note",
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

router.put(
  "/update_note/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id
    const { content } = req.body

    if (!id || !content) {
      throw new Error("Please Privide note id and new content")
    }
    const note = await DBMS.updateNote(id, content)

    if (note) {
      res.status(201).json(note)
    }
  })
)

router.delete(
  "/delete_note/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id
    const result = await DBMS.deleteNote(id)

    if (result === true) {
      res.status(200).json({ message: "Note Deleted" })
    }
  })
)

export default router
