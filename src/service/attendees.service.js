import attendeeModel from '../model/attendee.model.js'

const postAttendeesService = async (attendees)=>{
    
    try{
        const result = await attendeeModel.insertMany(attendees);
        return result.length>0?true:false; 
    }
    catch(err){
        console.log(err);
        return false;
    }
}

const getAttendeesService = async ()=>{

    const attendees = await attendeeModel.find();

    return attendees;
}

const removeAttendeesService = async (attendeesID)=>{

    const attendees = await attendeeModel.findOne({ _id:attendeesID})

    if(!attendees){
        return {
            "statusCode": 404,
            "msg": "Attendee does not exist"
        }
    }
    
    const remove = await attendeeModel.deleteOne({ _id:attendeesID})
    return {
        "statusCode": 200,
        "msg": "Atendee removed succesfully"
    }
}

const editAttendeesService = async (body) => {
    try {
        const attendees = await attendeeModel.findOne({ _id: body.attendeesID });

        if (!attendees) {
            return { "statusCode": 404, "msg": "Attendee does not exist" }
        }
        attendees.attendee = body.attendee;
        attendees.attendance = body.attendance;
        attendees.enterIn = body.enterIn;

        await attendees.save();
        
        return { "statusCode": 200, "msg": "Attendee successfully edited" }
    } catch (err) {
        console.log("Service error:", err);
        return { "statusCode": 500, "msg": err.message }
    }
}

export {
    postAttendeesService,
    getAttendeesService,
    removeAttendeesService,
    editAttendeesService
}