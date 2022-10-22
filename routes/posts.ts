import express from 'express'
import { Post } from '../models/post';

export const posts = express.Router();

posts.post("/", async ( req:express.Request,res:express.Response ) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save()
        return res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
});

//投稿の更新
posts.put("/:id", async(req:express.Request,res:express.Response) => {
    try {
        //まずリクエストされたidを探し出す
        const post = await Post.findById(req.params.id);
        //一致するのを確認してから更新
        if ( post?.userId === req.body.userId) {
            await post?.updateOne({
                $set: req.body
            });
            return res.status(200).json("更新しました")
        } else {
            return res.status(403).json("更新できません")
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//投稿の削除
posts.delete("/:id", async (req:express.Request,res:express.Response) => {
    try {
        const post = await Post.findById(req.params.id);
        if( post?.userId === req.body.userId ) {
            //一致すればdeleteOne関数を呼ぶだけ
            await post?.deleteOne();
            return res.status(200).json("削除をしました")
        } else {
            return res.status(403).json("削除できません")
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

//特定の投稿を見る
posts.get("/:id", async (req:express.Request,res:express.Response) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error)
    }
});

//特定の投稿にいいねをする
