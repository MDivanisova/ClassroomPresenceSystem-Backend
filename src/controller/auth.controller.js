import userModel from '../model/user.model.js';
import { loginService } from '../service/auth.service.js';
import { roleGuard } from '../utils/role.guard.js';
import { generateToken, verifyToken } from '../utils/jwt.tokens.js';
import { loginSchema } from '../utils/user.validation.js';

const login = async (req, res) => {

  const username =req.body.username;
  const password = req.body.password;

  const valResult = loginSchema.parse({username, password});
  const result = await loginService(username, password);


  return res.status(result.statusCode).json(result.msg);

}

export {login};