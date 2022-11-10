import mongoose, { model, Schema } from "mongoose";

interface User {
    _id           : mongoose.Schema.Types.ObjectId;
    username      : String ;
    email         : String ;
    password      : String ;
    profileImage? : String ;
    coverImage?   : String ;
    followers     : any ;
    followings    : any ;
    isAdmin       : Boolean ;
    description   : String  ;
    city          : String  ;
}

//USERのデータ構造
    const userSchema = new Schema<User>(
        {
            username: {
                type   : String ,
                require : true   ,
                min     : 2      ,
                max     : 25     ,
                //unique: trueで名前の重複を防ぐ
                unique  : true   ,
            },
            email   : {
                type   : String ,
                require : true   ,
                max     : 50     ,
                unique  : true   ,
            },
            password: {
                type   : String ,
                require : true   ,
                min     : 5      ,
                max     : 30     ,
            },
            profileImage: {
                type   : String ,
                default : ""     ,
            },
            coverImage  : {
                type   : String ,
                default : ""     ,
            },
            followers   : {
                type    : Array  ,
                default : []     ,
            },
            followings  : {
                type   : Array  ,
                default : []     ,
            },
            //＊権限があるかないか、認証済みか認証済みでないかの判定<-重要
            isAdmin     : {
                type   : Boolean,
                default : false  ,
            },
            //プロフィールの概要
            description : {
                type   : String ,
                max     : 50     ,
            },
            city        : {
                type   : String ,
                max     : 50     ,
            },
        },
        //日時を自動的に格納
        {timestamps: true}
    );

    export const User = model<User>('User', userSchema);
