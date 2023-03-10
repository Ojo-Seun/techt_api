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

  static createNote = async (note: Note) => {
    const db = await this.readFromDb()
    let notes = db["notes"]
    notes = [...notes, note]
    await writeFile("./src/Dams/db.json", JSON.stringify(notes, null, 2)).catch((err) => {
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
    await writeFile("./src/Dams/db.json", JSON.stringify(users, null, 2)).catch((err) => {
      if (err) {
        throw new Error(`${err.message}`)
      }
    })

    return { name: user.name, email: user.email, user_id: user.user_id, isAdmin: user.isAdmin }
  }
}

export default DBMS