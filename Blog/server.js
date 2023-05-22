const express = require('express')
const cors = require('cors')
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


// env config
dotenv.config()
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')

connectDB()

const app = express()


// middlewares

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


// routes

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog',blogRoutes)

const PORT=process.env.PORT || 3000
app.listen(PORT,() => {
    console.log(`server running on port ${PORT}` )
})
