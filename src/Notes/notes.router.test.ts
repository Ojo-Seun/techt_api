import app from "../app"
import request from "supertest"

const Token = ""

describe("note.router", () => {
  describe("GET/notes", () => {
    test("api/notes -> notes array", () => {
      return request(app)
        .get("/api/notes")
        .set({ Authorization: `Bearer ${Token}` })
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveLength(2)
        })
    })
  })

  describe("GET/note/id", () => {
    test("api/notes/id -> a note with a spacific id", () => {})
  })

  describe("PUT/notes/id", () => {
    test("api/notes/id -> new updates note", () => {})
  })

  describe("Delete/notes/id", () => {
    test("api/notes/id -> deleted note", () => {})
  })

  describe("POST/note", () => {
    test("api/note boolean", () => {})
  })
})
