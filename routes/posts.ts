import express from 'express'

export const posts = express.Router();

posts.get("/", ( req:express.Request,res:express.Response ) => {
    res.send("posts router")
})
