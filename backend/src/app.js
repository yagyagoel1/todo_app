import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    message: "Too many requests from this IP, please try again after 15 minutes",});
const app = express()


app.use(limiter)
app.use(helmet())
app.use(cors({
    origin: process.env.CLIENT_URL||'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true, limit: '16kb'}))
app.use(cookieParser())


import Router from './routes/index.route.js'

app.use('/api/v1', Router)



export default app
