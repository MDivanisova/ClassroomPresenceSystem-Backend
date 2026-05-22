import express from 'express'
import {postAttendees} from '../controller/attendees.controler.js'
import { hasPriveleges} from '../middleware/premission.middleware.js';

const attendeeRout = express.Router()


attendeeRout.post('/attendees',hasPriveleges, postAttendees);


export default attendeeRout;