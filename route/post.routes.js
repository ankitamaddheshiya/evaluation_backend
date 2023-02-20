const express = require("express")

const {postModel} = require("../model/posts.model")

const postRouter = express.Router()

postRouter.use(express.json())

postRouter.get("/",async(req,res)=>{
    const posts = await postModel.find()
    res.send(posts)
})

postRouter.post("/top",async(req,res)=>{
    const payload = req.body

    const posts = new postModel(payload)
    await posts.save()

    res.send({"msg":"Post Created"})
})

postRouter.delete("/delete/:id",async(req,res)=>{
    const postID = req.params.id

    await postModel.findByIdAndDelete({_id:postID})
    res.send({"msg":`posts with id ${postID} has been deleted`})
})

postRouter.patch("/update/:id",async(req,res)=>{
    const postID = req.params.id
    let payload = req.body

    await postModel.findByIdAndUpdate({_id:postID},payload)
    res.send({"msg":`posts with id ${postID} has been updated`})
})



module.exports ={
    postRouter
}