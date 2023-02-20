const express = require("express")
const {connection} = require("./db")
const {userRouter} = require("./route/user.routes")
const {postRouter} = require("./route/post.routes")

const {authenticate} = require("./middleware/authenticate.middleware")
const cors = require("cors")
require("dotenv").config()


const app = express()
app.use(express.json())
app.use(cors())


app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})

app.use("/users",userRouter)
app.use(authenticate)

app.use("/posts",postRouter)

app.listen(process.env.port,async(req,res)=>{
    try{
        await connection
        console.log("Connected to DB")
    }catch(err){
        console.log({"msg":"Something went Wrong","error":err.message})
    }
    console.log("Server is running at port")
})