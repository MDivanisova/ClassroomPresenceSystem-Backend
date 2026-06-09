import userModel from '../model/user.model.js';
import { getAllUsersService, loginService, registerService, removeUserService, editUserService } from '../service/auth.service.js';
import { generateToken, verifyToken } from '../utils/jwt.tokens.js';
import { loginSchema, registerSchema, userIDSchema, editUserSchema } from '../utils/user.validation.js';

const login = async (req, res) => {

  const username =req.body.username;
  const password = req.body.password;

  const valResult = loginSchema.parse({username, password});
  const result = await loginService(username, password);


  return res.status(result.statusCode).json(result.msg);

}

const register = async (req, res) => {
  const body = req.body;

  const valRes = registerSchema.parse(body);
  const result = await registerService(body);
  
  return res.status(result.statusCode).json({"msg":result.msg})
}

const getAllUsers = async (req, res) => {

    const result  = await getAllUsersService();
    
    return res.status(200).json({
      "users": result
    });
}

const removeUser = async (req, res) => {
  const userID = req.body.userID;


  const valRes = userIDSchema.parse({userID});

  const result = await removeUserService(userID);

  return res.status(result.statusCode).json(
    {
      "msg":result.msg
    }
  );
}

const updateUser = async (req, res) => {

  const body = req.body;

  const valRes = editUserSchema.parse(body);

  const result = await editUserService(body);
  
  return res.status(result.statusCode).json({"msg":result.msg});

}

export {
  login,
  register,
  getAllUsers,
  removeUser,
  updateUser
};