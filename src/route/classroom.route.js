import express from 'express'
import {createClassroom, getAllCalssrooms, removeClassroom, editClassroom} from '../controller/classroom.controller.js'
import { hasPriveleges, isAdmin} from '../middleware/premission.middleware.js';


const classroomRout = express.Router();


classroomRout.post('/classroom', isAdmin, createClassroom);
classroomRout.get('/classroom', hasPriveleges, getAllCalssrooms);
classroomRout.delete('/removeClassroom', isAdmin, removeClassroom);
classroomRout.put('/editClassroom', isAdmin, editClassroom)


export default classroomRout;