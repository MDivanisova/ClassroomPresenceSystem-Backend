import {attendeesSchema, attendeesIdSchema, attendeeEditSchema} from '../utils/attendees.validation.js'
import { postAttendeesService, getAttendeesService, removeAttendeesService, editAttendeesService } from '../service/attendees.service.js';
import attendeeModel from '../model/attendee.model.js';

const postAttendees = async (req, res) =>{

   const attendees = req.body.attendees;

    const valAttendees = attendeesSchema.parse({attendees});

    const result = await postAttendeesService(attendees);

    let statusCode = result ? 200 : 404

    return res.status(statusCode).json({
      "msg": result ? "Attendees created succesfully": "Attendees were not created",
      "success": result
    });
} ;

const getAttendees = async(req,res) =>{
  
  const result = await getAttendeesService();

  return res.status(200).json({"attendees":result})
}

const removeAttendees = async(req,res)=>{

  const attendeesID = req.body.attendeesID;

  const valRes = attendeesIdSchema.parse({attendeesID});

  const result = await removeAttendeesService(attendeesID);

  return res.status(result.statusCode).json({
    "msg":result.msg
  })
};

const editAttendees = async (req,res)=>{
  try{
    const body = req.body
   const valRes = attendeeEditSchema.parse(body);
   const result = await editAttendeesService(body);
   return res.status(result.statusCode).json({
      "msg": result.msg
   })
  }
  catch(err){
    console.log(err);
    return res.status(500).json({"msg":err});
  }
   
}

export {
    postAttendees,
    getAttendees,
    removeAttendees,
    editAttendees
}