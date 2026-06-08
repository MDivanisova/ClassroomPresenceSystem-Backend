import attendanceModel from "../model/attendance.model.js";
import balkanTime from "../utils/time.helper.js";

const getAttendanceService = async (filter, pagination) => {
    let query = {};

    // Filter by teacher name
    if (filter.teacher) {
        const teacherNameParts = filter.teacher.trim().split(' ');
        const teacherQuery = teacherNameParts.length > 1
            ? { name: teacherNameParts[0], surname: teacherNameParts[1] }
            : { $or: [{ name: filter.teacher }, { surname: filter.teacher }] };
        const teacher = await userModel.findOne(teacherQuery);
        if (teacher) {
            query.organizer = teacher._id;
        } else {
            // No teacher found, return empty
            return { attendances: [], pagination: { numAttendance: 0, totalPages: 0, pageNumber: pagination.pageNumber, pageSize: pagination.pageSize } };
        }
    }

    // Filter by classroom type
    if (filter.classroomType) {
        const classrooms = await classroomModel.find({ type: filter.classroomType }).select('_id');
        query.classroom = { $in: classrooms.map(c => c._id) };
    }

    // Filter by date (whole day range)
    if (filter.date) {
        const start = new Date(filter.date);
        start.setHours(0, 0, 0, 0);
        const end = new Date(filter.date);
        end.setHours(23, 59, 59, 999);
        query.startOn = { $gte: start, $lte: end };
    }

    const skip = (pagination.pageNumber - 1) * pagination.pageSize;
    const attendances = await attendanceModel.find(query)
        .skip(skip)
        .limit(pagination.pageSize)
        .sort({ createdAt: -1 })
        .populate('classroom', 'roomNumber type')
        .populate('organizer', 'name surname email _id')
        .populate({
            path: 'participants',
            select: "attendee enterIn",
            populate: {
                path: 'attendee',
                select: 'name surname email _id index'
            },
        });

    const numAttendance = await attendanceModel.countDocuments(query); // ← also pass query here
    const totalPages = Math.ceil(numAttendance / pagination.pageSize);

    return {
        attendances,
        pagination: {
            numAttendance,
            totalPages,
            pageNumber: pagination.pageNumber,
            pageSize: pagination.pageSize
        }
    };
};


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