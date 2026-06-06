import classroomModel from '../model/classroom.model.js'
import { creatClassroomService, getAllCalssroomsService,removeClassroomService, editClassroomService } from '../service/classroom.service.js';
import { classroomEditSchema, classroomIdSchema, classroomSchema } from '../utils/classroom.validation.js';

const createClassroom = async(req, res)=>{
    const roomNumber = req.body.roomNumber;
    const floor = req.body.floor;
    const campus = req.body.campus;
    const faculty = req.body.faculty;
    const type = req.body.type;

    
    const valClasroom = classroomSchema.parse({roomNumber, floor, campus, faculty, type});

    const classroomId = await creatClassroomService(roomNumber, floor, campus, faculty, type);

    return res.status(200).json({
        "msg": "Classroom sucesfully created",
        "classroomId": classroomId
    })


}

const getAllCalssrooms = async (req, res) =>{


    const classrooms = await getAllCalssroomsService();
    return res.status(200).json({
        "classrooms": classrooms
    })
};

const removeClassroom = async (req, res)=>{

    const classroomID = req.body.classroomID;

    const valres = classroomIdSchema.parse({classroomID});

    const result = await removeClassroomService(classroomID);

    return res.status(result.statusCode).json({
        "msg": result.msg
    });
}

const editClassroom = async (req,res)=>{
    const classroomID = req.body.classroomID;
    const roomNumber = req.body.roomNumber;
    const floor = req.body.floor;
    const campus = req.body.campus;
    const faculty = req.body.faculty;
    const type = req.body.type;

    const valres = classroomEditSchema.parse({classroomID,roomNumber,floor,campus,faculty,type});

    const result = await editClassroomService(classroomID,roomNumber,floor,campus,faculty,type);

    return res.status(result.statusCode).json({
        "msg": result.msg
    });
};

export {
    createClassroom,
    getAllCalssrooms,
    removeClassroom,
    editClassroom
};