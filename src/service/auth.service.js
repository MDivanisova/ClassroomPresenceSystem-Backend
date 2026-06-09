import userModel from "../model/user.model.js";
import { generateToken } from "../utils/jwt.tokens.js";
import {ROLE} from "../utils/enums.js";
import { Types } from "mongoose";


const loginService = async (username, password) => {
    const user = await userModel.findOne({username: username});
    if(!user){
        return {
                "msg":{"msg":"User dose not exist"},
                "statusCode": 401
        }
    }
    
    const result = await user.pwCmp(password);


    if(result){

        const jwtUser = {
            "_id": user._id,
          "username": user.username,
          "index": user.index,
          "role": user.role,
          "email": user.email,
        }

        const token = generateToken(jwtUser);
        return {
            "msg":{
                "token":token,
                "userId": jwtUser._id,
                "role": jwtUser.role
            },
            "statusCode": 200
        } 
    }
    else{
        return {
            "msg":{"msg":"Failed login wrong password try again."},
            "statusCode": 401
        }
    }  
}


const registerService = async (body) => {
    const username = await userModel.findOne({username: body.username});
    if(username){
        return {
            "statusCode":409,
            "msg":"Username is already in use"
        };
    }

    const userEmail = await userModel.findOne({email: body.email});
    if(userEmail){
        return {
            "statusCode":409,
            "msg":"Email is already in use"
        };
    }

    const newUser = userModel({
        index: body.index,
        name: body.name,
        surname: body.surname,
        email: body.email,
        username: body.username,
        password: body.password,
        role: body.role
    });
    await newUser.save();

    return {
        "statusCode":200,
        "msg":"succesfully"
    };


}

const getAllUsersService = async () => {
    const users = await userModel.find({});

    return users;
}

const removeUserService = async(userID)=>{
    const user = userModel.findOne({_id:userID});

    if(!user){
        return {
            "statusCode": 404,
            "msg":"User dose not exist"
        }
    }

    const result = await userModel.deleteOne({_id:userID});

    return {
        "statusCode":200,
        "msg":"User succesfully removed"
    }
}

const editUserService =async (body)=>{

    const user = await userModel.findOne({_id:body.userID});

    if(!user){
        return {
            "statusCode": 404,
            "msg":"User dose not exist"
        }
    }
    
    const username = await userModel.findOne({
        username: body.username,
        _id:{$ne:new Types.ObjectId(body.userID)}
    });

    if(username){
        return {
            "statusCode":409,
            "msg":"Username is already in use"
        };
    }

    const userEmail = await userModel.findOne({
        email: body.email,
        _id:{$ne:new Types.ObjectId(body.userID)}
    });
    if(userEmail){
        return {
            "statusCode":409,
            "msg":"Email is already in use"
        };
    }

    user.index = body.index,
    user.name = body.name,
    user.surname = body.surname,
    user.email = body.email,
    user.username = body.username,
    user.role = body.role

    await user.save();

    return {
        "statusCode":200,
        "msg":"User succesfully edited"
    }
}

export {
    loginService,
    registerService,
    getAllUsersService,
    removeUserService,
    editUserService
}