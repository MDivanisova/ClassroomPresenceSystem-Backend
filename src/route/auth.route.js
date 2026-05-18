import express from 'express';
import {login} from '../controller/auth.controller.js'


const authRout = express.Router();


authRout.get('/login', login);


export default authRout;