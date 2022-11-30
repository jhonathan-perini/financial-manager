import express from 'express'
import cors from 'cors'
import compression from 'compression'

const app = express()

app.use(cors({
    origin: '*'
}));

app.use(express.json())
app.use(compression())


export default app