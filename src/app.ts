import expres from "express"
import dotenv from "dotenv"
import cors from "cors"
import rateLimit from "express-rate-limit"
import { Request, Response, NextFunction } from "express"
import notesRouter from "./Notes/notes.router"

const app = expres()
dotenv.config()
app.use(expres.json())
app.use(expres.urlencoded({ extended: true }))
app.use(cors())

const apiLimit = rateLimit({
  windowMs: 15 * 1000,
  max: 5,
  message: "Too Much Request",
})

app.use(apiLimit)

app.use("/api", notesRouter)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const status = err.name && err.name === "validationError" ? 400 : 500
  res.status(status).send({ message: err.message })
})

export default app
