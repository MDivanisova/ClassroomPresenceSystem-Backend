import userModel from '../model/user.model.js';
import { loginService, registerService } from '../service/auth.service.js';
import { generateToken, verifyToken } from '../utils/jwt.tokens.js';
import { loginSchema, registerSchema } from '../utils/user.validation.js';

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
  
  return res.status(200).json({"msg":"User registered"})
}

export {
  login,
  register
};