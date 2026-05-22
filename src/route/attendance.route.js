import express from 'express';
import { endAttendance, getAttendance, insertAttendance } from '../controller/attendance.controller.js';


const attendanceRout = express.Router();

attendanceRout.get('/attendance', getAttendance);

attendanceRout.post('/createAttandance', insertAttendance);

attendanceRout.put('/endAttandance', endAttendance);

export default attendanceRout;