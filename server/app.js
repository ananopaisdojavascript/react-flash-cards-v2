import express from "express"
import cors from "cors"
import winston from "winston"

const app = express()

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level} : ${message}`
})

global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: "flashcards-api.log" })
  ],
  format: combine(
    label({ label: "flashcards-api" }),
    timestamp(),
    myFormat
  )
})

app.use(express.json())
app.use(cors())

const port = 3000

app.listen(port, () => {
  try {
    logger.info(`Servidor funcionando na porta ${port}`)
  } catch (error) {
    logger.error(error)
  }
})