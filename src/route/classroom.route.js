import express from 'express'
import {createClassroom, getAllCalssrooms} from '../controller/classroom.controller.js'


const classroomRoute = express.Router();


classroomRoute.post('/classroom', createClassroom);
classroomRoute.get('/classroom', getAllCalssrooms);


export default classroomRoute;