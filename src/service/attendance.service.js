import attendanceModel from "../model/attendance.model.js";
import balkanTime from "../utils/time.helper.js";

const getAttendanceService = async (filter, pagination)=>{
    let query ={

    }
    
    if(filter.date) query.startOn = filter.date;
    if(filter.teacher) query.organizer = filter.teacher;
    if(filter.classroom) query.classroom = filter.classroom;

    const skip = (pagination.pageNumber-1)*pagination.pageSize;

    const attendances = await attendanceModel.find(query).skip(skip).limit(pagination.pageSize).sort({createdAt: -1});

    const numAttendance = attendances.length;

    const totalPages = Math.ceil(numAttendance/pagination.pageSize);
    const pageSize = pagination.pageSize;
    const pageNumber = pagination.pageNumber;
    return {
        attendances,
        pagination:{
            numAttendance,
            totalPages,
            pageNumber,
            pageSize
        } 
    };
}


const insertAttendanceService = async (classroomID, title, user)=>{

    const start = new Date();
    const organizer = user._id;
    const classroom = classroomID;


    const attendance = new attendanceModel({
        classroom: classroom,
        organizer: organizer,
        startOn: start,
        title:title
    });

    attendance.save();


    return attendance._id;


}

const endAttendanceService = async (attendanceID)=>{

    const endOn = new Date(); 

    const res = await attendanceModel.updateOne({_id:attendanceID},{$set: {endOn: endOn}});

    return res.modifiedCount === 1 ? {"msg":"Succesfully ended attandance.", "statusCode": 200}: {"msg":"Attandance not found.", "statusCode": 404}
};

const removeAttendanceService = async (attendanceID)=>{

    const attendance = await attendanceModel.findOne({ _id:attendanceID});
    if(!attendance){
        return {
            "statusCode": 404,
            "msg": "Attendance does not exist"
        }
    }
    
    const removeRes = await attendanceModel.deleteOne({ _id:attendanceID});
    return{
        "statusCode": 200,
        "msg": "Attendance removed succesfully"
    };
};

export {
    getAttendanceService,
    insertAttendanceService,
    endAttendanceService,
    removeAttendanceService
}