import { readFile, writeFile } from "fs/promises"
import { Note, Notes, User, Users } from "../utils/type"

class DBMS {
  static readFromDb = async () => {
    const db = await readFile("./src/Dams/db.json", "utf-8")
    return JSON.parse(db)
  }

  static getNotes = async () => {
    const db = await this.readFromDb()
    return db["notes"]
  }

  static getNoteById = async (id: string) => {
    const db = await this.readFromDb()
    const notes: Notes = db["notes"]
    const note = notes.find((x) => x.id === id)

    if (!note?.id) {
      throw new Error("Note Not Found")
    }

    return note
  }

  static createNote = async (note: Note) => {
    const db = await this.readFromDb()
    let notes = db["notes"]
    notes = [...notes, note]

    await writeFile("./src/Dams/db.json", JSON.stringify({ ...db, notes }, null, 2)).catch((err) => {
      if (err) {
        throw new Error(`${err.message}`)
      }
    })

    return true
  }

  static createUser = async (user: User) => {
    const db = await this.readFromDb()

    let users = db["users"]
    users = [...users, user]
    await writeFile("./src/Dams/db.json", JSON.stringify({ ...db, users }, null, 2)).catch((err) => {
      if (err) {
        throw new Error(`${err.message}`)
      }
    })

    return { name: user.name, email: user.email, user_id: user.user_id, isAdmin: user.isAdmin }
  }

  static updateNote = async (id: string, content: string) => {
    const db = await this.readFromDb()
    let notes: Notes = db["notes"]
    const oldNote = notes.find((x) => x.id === id)
    if (!oldNote) {
      throw new Error("Note Not Found")
    }

    const newNote = { ...oldNote, content: content }

    const newNotes: Notes = []
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i]
      if (element.id === id) {
        newNotes.push(newNote)
      } else {
        newNotes.push(element)
      }
    }

    await writeFile("./src/Dams/db.json", JSON.stringify({ ...db, notes: [...newNotes] }, null, 2)).catch((err) => {
      if (err) {
        throw new Error(`${err.message}`)
      }
    })

    return newNote
  }

  static deleteNote = async (id: string) => {
    const db = await this.readFromDb()
    const notes: Notes = db["notes"]

    const newNotes: Notes = []

    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === id) {
        newNotes.push(notes[i])
      }
    }

    await writeFile("./src/Dams/db.json", JSON.stringify({ ...db, newNotes }, null, 2)).catch((err) => {
      if (err) {
        throw new Error(`${err.message}`)
      }
    })

    return true
  }
}

export default DBMS
