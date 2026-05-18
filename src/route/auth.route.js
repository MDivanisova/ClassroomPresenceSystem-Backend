import express from 'express';
import {login} from '../controller/auth.controller.js'


const authRout = express.Router();


authRout.post('/login', await login);


export default authRout;