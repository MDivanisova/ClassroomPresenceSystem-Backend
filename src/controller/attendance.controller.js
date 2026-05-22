import attendanceModel from '../model/attendance.model.js';
import {getAttendanceService, insertAttendanceService} from '../service/attendance.service.js';
import {attendanceIdSchema, attendanceSchema} from '../utils/attendance.validation.js'
import { roleGuard } from '../utils/role.guard.js';


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

        if(!(roleGuard(req.user.role).hasPrem)) return res.status(403).json({"msg": "You do not have premissions you are not a teacher."})


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
    
    if(!(roleGuard(req.user.role).hasPrem)) return res.status(403).json({"msg": "You do not have premissions you are not a teacher."})

    const valRes = attendanceSchema.parse({classroomID, title});

    const attendanceId = await insertAttendanceService(classroomID, title, req.user);

    
    return res.status(200).json({
      "msg": "Attendance created succesfully",
      "attendanceId": attendanceId
    });

};

const endAttendance = async (req, res)=>{

    const attendanceID = req.body.attendanceID; 
    if(!(roleGuard(req.user.role).hasPrem)) return res.status(403).json({"msg": "You do not have premissions you are not a teacher."})

    const valres = attendanceIdSchema({attendanceID});
        
    const result = await endAttendanceService(attendanceID); 

    return res.status(result.statusCode).json({
        "msg": result.msg
    })
};

export {
  getAttendance,
  insertAttendance,
  endAttendance
};