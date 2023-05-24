import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import postsRoutes from './Routes/postsRoutes.js'
dotenv.config()


connectDB();

const app = express()
app.use(express.json())

app.use('/api/v1/posts',postsRoutes)
const PORT= process.env.PORT || 3000
app.listen(PORT,() => {
    console.log(`server running at ${PORT}`)
})