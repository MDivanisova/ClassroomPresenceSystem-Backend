import {attendeesSchema} from '../utils/attendees.validation.js'
import { postAttendeesService } from '../service/attendees.service.js';
import { roleGuard } from '../utils/role.guard.js';

const postAttendees = async (req, res) =>{

   const attendees = req.body.attendees;

    if(!(roleGuard(req.user.role).hasPrem)) return res.status(403).json({"msg": "You do not have premissions you are not a teacher."})

    const valAttendees = attendeesSchema.parse({attendees});

    const result = await postAttendeesService(attendees);

    let statusCode = result ? 200 : 404

    return res.status(statusCode).json({
      "msg": result ? "Attendees created succesfully": "Attendees were not created",
      "success": result
    });
} ;

export {
    postAttendees
}