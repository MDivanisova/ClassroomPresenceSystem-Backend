import express from 'express'
import {postAttendees} from '../controller/attendees.controler.js'

const attendeeRout = express.Router()


attendeeRout.post('/attendees', postAttendees);


export default attendeeRout;