import express from 'express'
import {createClassroom, getAllCalssrooms} from '../controller/classroom.controller.js'
import { hasPriveleges} from '../middleware/premission.middleware.js';


const classroomRout = express.Router();


classroomRout.post('/classroom', hasPriveleges, createClassroom);
classroomRout.get('/classroom', hasPriveleges, getAllCalssrooms);


export default classroomRout;