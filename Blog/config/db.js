const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Connected to MongoDB Database`)
    } catch (error) {
        console.log(`MongoDB error`)
    }
}

module.exports = connectDB;