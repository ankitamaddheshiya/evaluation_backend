const express = require("express")
const { userModel } = require("../model/user.model")
const userRouter = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


userRouter.post("/register", async(req, res) => {
    const { email, name, pass, gender, age, city } = req.body
    try {
        bcrypt.hash(pass, 5, async(err, hash)=>{
            if (err) res.send({ "msg": "Something went Wrong", "error": err.message })
            else {
                const user = new userModel({ name, email, gender, city, age, pass: hash })
                await user.save()
                res.send({ "msg": "New user has been Registered" })
            }
        })

    } catch (err) {
        res.send( "User already exist, please login ")
    }
})


userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body

    try {
        const user = await userModel.find({ email })
        console.log(user)
        if (user.length > 0) {
            bcrypt.compare(pass, user[0].pass, (err,result)=>{
                if (result) {
                    let token = jwt.sign({ userID: user[0]._id }, "masai")

                    res.send({ "msg": "Logged in ", "token": token })
                } else {
                    res.send({ "msg": "Wrong Credentials" })

                }
            })
        } else {
            res.send({ "msg": "Wrong Credentials" })
        }


    } catch (err) {
        res.send({ "msg": "Something Went Wrong", "error": err.message })
    }
})

module.exports ={
    userRouter
}