import express from 'express';
import {login, register} from '../controller/auth.controller.js'
import { isAdmin } from '../middleware/premission.middleware.js';


const authRout = express.Router();


authRout.post('/login', login);
authRout.post('/register', register);

export default authRout;