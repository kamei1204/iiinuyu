import express from 'express'
import mongoose from 'mongoose';
import { auth } from './routes/auth';
import { mongoUrl } from './mongoUrl';
import { posts } from './routes/posts';
import { users } from './routes/users'

const app: express.Express = express()
const PORT = 3000;
const userUsers = users;
const userAuth = auth;
const userPosts = posts;

//データベース接続
const mongooseDataBase = mongoose;


mongooseDataBase.connect(mongoUrl).then(() => {
    console.log("DB接続中...");
}).catch((err) => {
    console.log(err)
});

//ミドルウェア
//server.tsと切り離すためにrouter.tsを使った。
//routingが増え記述が多くなるため
app.use(express.json());
app.use("/api/users", userUsers);
app.use("/api/auth", userAuth);
app.use("/api/posts", userPosts);

app.get("/", ( req:express.Request,res:express.Response ) => {
    res.send("hello sunny");
})

app.listen(PORT, () => console.log("サーバーが起動しました"))