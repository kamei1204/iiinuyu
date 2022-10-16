import express from "express"

export const router = express.Router();

router.get("/", (req: express.Request,res: express.Response) => {
    res.send("user router");
});
