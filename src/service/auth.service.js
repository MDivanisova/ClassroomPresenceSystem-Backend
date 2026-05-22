import userModel from "../model/user.model.js";
import { generateToken } from "../utils/jwt.tokens.js";

const loginService = async (username, password) => {
    const user = await userModel.findOne({username: username});
    if(!user){
        return {
                "msg":{"msg":"Username dose not exist."},
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
                "userId": jwtUser._id
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
    
    const newUser = userModel({
        index: body.index,
        name: body.name,
        surname: body.surname,
        email: body.email,
        username: body.username,
        password: body.password,
        role: body.role
    });
    newUser.save();

    return true;


}
export {
    loginService,
    registerService
}