import { model, Schema } from "mongoose";

interface Post {
        userId      : String,
        description : String,
        img         : String,
        likes       : String,
}

const postSchema = new Schema<Post> (
    {
        userId : {
            type: String,
            required : true,
        },
        description : {
            type: String,
            max : 200   ,
        },
        img : {
            type: String,
        },
        likes : {
            type : Array,
            default : [],
        },
    },
    {timestamps: true}
);

export const Post = model<Post>('post',postSchema);