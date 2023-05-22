const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
exports.registerController = async (req,res) => {
    try {
        const { username, email, passsword } = req.body
        if (!username || !email || !passsword) {
            return res.status(400).send({
                success: false,
                message: 'please filled all fields'
            })
        }
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(401).send({
                success: false,
                message:'user already exists'
            })
        }
        const hashedPassword = await bcrypt.hash(passsword, 10)
        const user = new userModel({ username, email, hashedPassword })
        await user.save()
        return res.status(401).send({
            success: true,
            message:"New user created"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: 'Error in register callback',
            success: false,
            
        })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({})
        return res.status(200).send({
            userCount: users.length,
            success: true,
            message: "all users data",
            user
        })
    } catch (error) {
        console.log(error)
        return res.status.send(500)({
            success: false,
            message: 'Error in get all user',
            error
        })
    }
}

    


exports.loginController = async(req,res) => {
    try {
        const { email, passsword } = req.body;
        // validation
        if (!email || !passsword) {
            return res.status(401).send({
                success: false,
                message:'Please provide email or password'
            })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(200).send({
                success: false,
                message:'email is not registerd'
            })
        }

        const isMatch = await bcrypt.compare(passsword, user.password)
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid username or password',
                error
            })
        }
        return res.status(200).send({
            success: true,
            message: 'login successfully',
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: 'Error in Login',
            error
        })
        
    }
}