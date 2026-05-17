import express from 'express';
import {login} from '../controller/auth.controller.js'


const AuthRout = express.Router();


AuthRout.get('/login', login);


export default AuthRout;