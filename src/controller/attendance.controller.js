import attendanceModel from '../model/attendance.model.js';
import {getAttendanceService, insertAttendanceService, endAttendanceService, removeAttendanceService} from '../service/attendance.service.js';
import {attendanceIdSchema, attendanceSchema} from '../utils/attendance.validation.js'


const getAttendance = async (req, res) => {
    try {
        const filter = {
            date: req.query.date,
            teacher: req.query.teacher,
            classroom: req.query.classroom
        };
        const pagination = {
            pageSize: parseInt(req.query.pageSize) || 10,
            pageNumber: parseInt(req.query.pageNumber) || 1
        };


        const result = await getAttendanceService(filter, pagination);
        return res.status(200).json({
            msg: "Attendances fetched successfully",
            ...result
        });
    } catch (err) {
        console.error("CONTROLLER ERROR:", err.message); 
        return res.status(500).json({ error: err.message });
    }
};


const insertAttendance = async (req, res)=>{

    const classroomID = req.body.classroomID;
    const title = req.body.title;
    
    const valRes = attendanceSchema.parse({classroomID, title});

    const attendanceId = await insertAttendanceService(classroomID, title, req.user);

    
    return res.status(200).json({
      "msg": "Attendance created succesfully",
      "attendanceId": attendanceId
    });

};

const endAttendance = async (req, res)=>{

    const attendanceID = req.body.attendanceID; 

    const valres = attendanceIdSchema.parse({attendanceID});

    const result = await endAttendanceService(attendanceID); 

    return res.status(result.statusCode).json({
        "msg": result.msg
    })
};

const removeAttendance = async (req, res)=>{

    const attendanceID = req.body.attendanceID;
    
    const valres = attendanceIdSchema.parse({attendanceID});

    const result = await removeAttendanceService(attendanceID);

    return res.status(result.statusCode).json({
        "msg": result.msg
    });
};

export {
  getAttendance,
  insertAttendance,
  endAttendance,
  removeAttendance
};