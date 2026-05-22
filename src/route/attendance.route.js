import express from 'express';
import { endAttendance, getAttendance, insertAttendance } from '../controller/attendance.controller.js';
import { hasPriveleges} from '../middleware/premission.middleware.js';


const attendanceRout = express.Router();

attendanceRout.get('/attendance', hasPriveleges, getAttendance);

attendanceRout.post('/createAttandance', hasPriveleges, insertAttendance);

attendanceRout.put('/endAttandance', hasPriveleges, endAttendance);

export default attendanceRout;