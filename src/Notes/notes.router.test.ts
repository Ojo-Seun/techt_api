import app from "../app"
import request from "supertest"

const Token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInVzZXJfaWQiOiJiMWI4NzU1Yy0yOWYzLTRjOGItYTBjMy04NjQwNzIzNjM0MmUiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2Nzg0OTAyMDYsImV4cCI6MTY3ODY2MzAwNn0._bL9J36t5zwa8bcFgWDJSn1LxJLcIjADSCLPj1-4wcM"

describe.only("note.router", () => {
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
    test("api/notes/id -> a note with a spacific id", () => {
      return request(app)
        .get("/api/note/2a399466-1983-4339-bdbb-c404ec97c6a7")
        .set({ Authorization: `Bearer ${Token}` })
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual({
            title: "React",
            content: "React is a JavaScript Library use to create reuseable UI component for SPA",
            user_id: "b1b8755c-29f3-4c8b-a0c3-86407236342e",
            id: "2a399466-1983-4339-bdbb-c404ec97c6a7",
          })
        })
    })
  })

  describe("PUT/notes/id", () => {
    test("api/notes/id -> new updates note", () => {
      return request(app)
        .put("/api/update_note/2a399466-1983-4339-bdbb-c404ec97c6a7")
        .send({ content: "React is a JavaScript Library use to create reuseable UI component for SPA" })
        .set({ Authorization: `Bearer ${Token}` })
        .expect(201)
        .then((res) => {
          expect(res.body).toEqual({
            title: "React",
            content: "React is a JavaScript Library use to create reuseable UI component for SPA",
            user_id: "b1b8755c-29f3-4c8b-a0c3-86407236342e",
            id: "2a399466-1983-4339-bdbb-c404ec97c6a7",
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
