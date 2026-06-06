import express from 'express';
import {login, register, getAllUsers, removeUser, updateUser} from '../controller/auth.controller.js'
import { hasPriveleges, isAdmin } from '../middleware/premission.middleware.js';
import middle from '../middleware/auth.middleware.js';


const authRout = express.Router();


authRout.post('/login', login);
authRout.post('/register', middle, isAdmin, register);
authRout.get('/getAllUsers', middle, isAdmin, getAllUsers);
authRout.delete('/removeUser', middle, isAdmin, removeUser);
authRout.put('/editUser', middle, isAdmin, updateUser);


export default authRout;