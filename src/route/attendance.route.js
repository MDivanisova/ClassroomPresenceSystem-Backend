import express from 'express';
import { endAttendance, getAttendance, insertAttendance, removeAttendance } from '../controller/attendance.controller.js';
import { hasPriveleges, isAdmin} from '../middleware/premission.middleware.js';


const attendanceRout = express.Router();

attendanceRout.get('/attendance', hasPriveleges, getAttendance);

attendanceRout.post('/createAttandance', hasPriveleges, insertAttendance);

attendanceRout.put('/endAttandance', hasPriveleges, endAttendance);

attendanceRout.delete('/removeAttendance', isAdmin, removeAttendance);

export default attendanceRout;