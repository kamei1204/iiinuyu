import express from 'express'

export const auth = express.Router();

auth.get("/", ( req:express.Request,res:express.Response ) => {
    res.send("auth router");
});