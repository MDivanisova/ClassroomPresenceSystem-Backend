import express from 'express';
import { getAttendance } from '../controller/attendance.controller.js';


const AttendanceRout = express.Router();


AttendanceRout.get('/attendance', getAttendance);


export default AttendanceRout;