import cluster from "cluster"
import app from "./app"
import OS from "os"

const PORT = process.env.NODE_ENV || 3000

if (process.env.NODE_ENV === "production") {
  if (cluster.isPrimary) {
    const numOfCPUS = OS.cpus().length
    for (let i = 0; i < numOfCPUS; i++) {
      cluster.fork()
    }
  } else {
    app.listen(PORT)
  }
} else {
  app.listen(PORT, () => console.log(`Thread ${process.pid} Running At port ${PORT}`))
}
