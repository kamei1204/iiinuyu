import express from 'express'

import { User } from "../models/user";

export const auth = express.Router();


auth.post("/register", async (req: express.Request,res: express.Response) => {
    try {
        const user = new User({
            username: req.body.username,
            email   : req.body.email,
            password: req.body.password,
        });
        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
});

auth.post("/login", async (req: express.Request,res: express.Response) => {
    try {
        // mongooseのfindOne関数でUser情報から。reqされた(打ち込まれたemail)と一致するものを探し出す。
        const user = await User.findOne({ email: req.body.email});
        if(!user) return res.status(404).send("ユーザーが見つかりません");

        const validatePassword = req.body.password === user.password;
        if(!validatePassword) return res.status(400).send("パスワードが違います");
        return res.status(200).json(user);
    } catch(error) {
        return res.status(500).json(error);
    }
})
// export const auth = express.Router();

// auth.get("/", ( req:express.Request,res:express.Response ) => {
//     res.send("auth router");
// });