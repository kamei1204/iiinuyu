import express from "express"
import { User } from "../models/user";

export const users = express.Router();
users.put("/:id", async ( req:express.Request,res:express.Response ) => {
    //CRUD操作

    //idの照合 データのアップデート(CRUDのUpdate)
    if( req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            //findByIdAndUpdate()はmongooseの関数で更新するidを探し出す
            const user = await User.findByIdAndUpdate(req.params.id,{
                //$set = 全てのparameter(userSchemaの)
                $set: req.body,
            });
            res.status(200).json("ユーザーの更新が完了しました")
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        return res.status(403).json("アカウントが見つかりません");
    }
});

//idの操作 データの削除(CRUDのDelete)
users.delete("/:id", async ( req:express.Request,res:express.Response ) => {
    if( req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("アカウントの削除が完了しました")
        } catch (error) {
            res.status(500).json("削除するアカウントが見つかりません")
        };
    };
});

//idの操作 ユーザー情報の取得
users.get("/:id", async ( req:express.Request,res:express.Response ) => {
        try {
            const user = await User.findById(req.params.id);
            //分割代入で見られる必要のないデータを表示しないようにする
            // const { password, ...other } = user?._doc;
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json("アカウントが見つかりません")
        };
    });

    //ユーザーのフォロー
    users.put("/:id/follow", async ( req:express.Request,res:express.Response ) => {
        if ( req.body.userId !== req.params.id ) {
            try {
                //params.id = 自分ではないユーザー
                const user = await User.findById(req.params.id);
                const currentUser = await User.findById(req.body.userId);
                //フォロワーに自分がいなかったら、TRUEになりフォローできる
                if ( !user?.followers.includes(req.body.userId)) {
                    await user?.updateOne({
                        $push: {
                            followers: req.body.userId,
                        },
                    });
                    await currentUser?.updateOne({
                        $push: {
                            followings: req.params.id
                        },
                    });
                    return res.status(200).json("フォローに成功しました");
                } else {
                    return res.status(403).json("すでにフォローしています");
                }
            } catch (error) {
                res.status(500).json(error);
            }
        } else {
            res.status(500).json("フォローできません")
        }
    });

    //フォローの解除
    users.put("/:id/unfollow", async ( req:express.Request,res:express.Response ) => {
        if ( req.body.userId !== req.params.id ) {
            try {
                //params.id = 自分ではないユーザー
                const user = await User.findById(req.params.id);
                const currentUser = await User.findById(req.body.userId);
                //フォロワーに自分が存在したら、フォローを解除する
                if ( user?.followers.includes(req.body.userId)) {
                    await user?.updateOne({
                        $pull: {
                            followers: req.body.userId,
                        },
                    });
                    await currentUser?.updateOne({
                        $pull: {
                            followings: req.params.id
                        },
                    });
                    return res.status(200).json("フォローを解除しました");
                } else {
                    return res.status(403).json("すでにフォローを解除しています");
                }
            } catch (error) {
                res.status(500).json(error);
            }
        } else {
            res.status(500).json("フォロー解除できません")
        }
    });