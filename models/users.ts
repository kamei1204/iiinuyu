import mongoose from "mongoose";

const mongooseData = mongoose;

interface User {
    username      : String ;
    email         : String ;
    password      : String ;
    profileImage? : String ;
    coverImage?   : String ;
    followers     : Array<Number> ;
    followings    : Array<Number> ;
    isAdmin       : Boolean ;
    description   : String  ;
    city          : String  ;
}

//データ構造の作成とインスタンス
const userSchema = new mongooseData.Schema<User>(
    {
        username: {
            types   : String ,
            require : true   ,
            min     : 2      ,
            max     : 25     ,
            //unique: trueで名前の重複を防ぐ
            unique  : true   ,
        },
        email   : {
            types   : String ,
            require : true   ,
            max     : 50     ,
            unique  : true   ,
        },
        password: {
            types   : String ,
            require : true   ,
            min     : 5      ,
            max     : 30     ,
        },
        profileImage: {
            types   : String ,
            default : ""     ,
        },
        coverImage  : {
            types   : String ,
            default : ""     ,
        },
        followers   : {
            types   : Array  ,
            default : []     ,
        },
        followings  : {
            types   : Array  ,
            default : []     ,
        },
        //＊権限があるかないか、認証済みか認証済みでないかの判定<-重要
        isAdmin     : {
            types   : Boolean,
            default : false  ,
        },
        //プロフィールの概要
        description : {
            types   : String ,
            max     : 50     ,
        },
        city        : {
            types   : String ,
            max     : 50     ,
        },
    },
    //日時を自動的に格納する
    {timestamps: true}
);