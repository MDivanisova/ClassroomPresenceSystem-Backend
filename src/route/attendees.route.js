import express from 'express'
import {postAttendees, getAttendees, removeAttendees, editAttendees} from '../controller/attendees.controler.js'
import { hasPriveleges, isAdmin} from '../middleware/premission.middleware.js';

const attendeeRout = express.Router()


attendeeRout.post('/attendees',hasPriveleges, postAttendees);
attendeeRout.get('/getAttendees',isAdmin, getAttendees);
attendeeRout.delete('/deleteAttendees',isAdmin, removeAttendees);
attendeeRout.put('/editAttendees', isAdmin,editAttendees);



export default attendeeRout;