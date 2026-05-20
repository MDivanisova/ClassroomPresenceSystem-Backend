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

export {
    postAttendeesService
}