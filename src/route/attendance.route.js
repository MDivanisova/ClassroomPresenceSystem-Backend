import express from 'express';
import { getAttendance, insertAttendance } from '../controller/attendance.controller.js';


const attendanceRout = express.Router();

attendanceRout.get('/attendance', getAttendance);

attendanceRout.post('/createAttandance', insertAttendance);

export default attendanceRout;