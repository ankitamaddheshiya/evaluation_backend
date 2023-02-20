const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title: String,
    body: String,
    device: String,
    no_if_comments: Number
})

const postModel = mongoose.model("posts",postSchema)

module.exports ={
    postModel
}