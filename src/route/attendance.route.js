import express from 'express';
import { getAttendance } from '../controller/attendance.controller.js';


const attendanceRout = express.Router();


attendanceRout.get('/attendance', getAttendance);


export default attendanceRout;