import express from 'express'
import {createClassroom, getAllCalssrooms} from '../controller/classroom.controller.js'


const classroomRout = express.Router();


classroomRout.post('/classroom', createClassroom);
classroomRout.get('/classroom', getAllCalssrooms);


export default classroomRout;