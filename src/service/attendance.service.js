import attendanceModel from "../model/attendance.model.js";

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
        startOn: startOn,
        title:title
    });

    attendance.save();


    return attendance._id;


}

export {
    getAttendanceService,
    insertAttendanceService
}