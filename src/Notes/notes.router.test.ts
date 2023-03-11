import app from "../app"
import request from "supertest"
import DBMS from "../Dams/Dbms"
import { Notes, Users } from "../utils/type"

let db: { notes: Notes; users: Users }
const Token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJfaWQiOiJiMWI4NzU1Yy0yOWYzLTRjOGItYTBjMy04NjQwNzIzNjM0MmUiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2Nzg0OTAyMDYsImV4cCI6MTY3ODY2MzAwNn0._bL9J36t5zwa8bcFgWDJSn1LxJLcIjADSCLPj1-4wcM"

describe("note.router", () => {
  beforeEach(async () => {
    db = await DBMS.readFromDb()
  })

  describe.only("GET/notes", () => {
    test("api/notes -> notes array", () => {
      return request(app)
        .get("/api/notes")
        .set({ Authorization: `Bearer ${Token}` })
        .expect(200)
        .then((res) => {
          expect(res.body).toHaveLength(db["notes"].length)
        })
    })
  })

  describe("GET/note/id", () => {
    test("api/notes/id -> a note with a spacific id", () => {
      return request(app)
        .get("/api/note/26ab0244-c6c0-4b70-97f6-8e37ae8ee9db")
        .set({ Authorization: `Bearer ${Token}` })
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual({
            title: "Typescript",
            content: "Typescript is a superset of javascript",
            user_id: "b1b8755c-29f3-4c8b-a0c3-86407236342e",
            id: "26ab0244-c6c0-4b70-97f6-8e37ae8ee9db",
          })
        })
    })
  })

  describe("PUT/notes/id", () => {
    test("api/notes/id -> new updates note", () => {
      return request(app)
        .put("/api/update_note/26ab0244-c6c0-4b70-97f6-8e37ae8ee9db")
        .send({ content: "React is a JavaScript Library use to create reuseable UI component for SPA", title: "React" })
        .set({ Authorization: `Bearer ${Token}` })
        .expect(201)
        .then((res) => {
          expect(res.body).toEqual({
            title: "React",
            content: "React is a JavaScript Library use to create reuseable UI component for SPA",
            user_id: "b1b8755c-29f3-4c8b-a0c3-86407236342e",
            id: "26ab0244-c6c0-4b70-97f6-8e37ae8ee9db",
          })
        })
    })
  })

  describe("Delete/notes/id", () => {
    test("api/notes/id -> Note Deleted", () => {
      return request(app)
        .delete("/api/delete_note/0bcf9f96-9f13-42c4-a722-d135baca0dc9")
        .set({ Authorization: `Bearer ${Token}` })
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual({ message: "Note Deleted" })
        })
    })
  })

  describe("POST/note", () => {
    test("api/create_note ->Note Created", () => {
      return request(app)
        .post("/api/create_note")
        .set({ Authorization: `Bearer ${Token}` })
        .send({
          title: "Typescript",
          content: "Typescript is a superset of javascript",
          user_id: "b1b8755c-29f3-4c8b-a0c3-86407236342e",
        })
        .expect(201)
        .then((res) => {
          expect(res.body).toEqual({ message: "Note Created" })
        })
    })
  })
})
