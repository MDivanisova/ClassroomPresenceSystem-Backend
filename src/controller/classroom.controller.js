import classroomModel from '../model/classroom.model.js'
import { creatClassroomService, getAllCalssroomsService } from '../service/classroom.service.js';
import { classroomSchema } from '../utils/classroom.validation.js';


const createClassroom = async(req, res)=>{
    const roomNumber = req.body.roomNumber;
    const floor = req.body.floor;
    const campus = req.body.campus;
    const faculty = req.body.faculty;
    const type = req.body.type;

    if(!(roleGuard(req.user.role).hasPrem)) return res.status(403).json({"msg": "You do not have premissions you are not a teacher."})
    
    const valClasroom = classroomSchema.parse({roomNumber, floor, campus, faculty, type});

    const classroomId = await creatClassroomService(roomNumber, floor, campus, faculty, type);

    return res.status(200).json({
        "msg": "Classroom sucesfully created",
        "classroomId": classroomId
    })


}

const getAllCalssrooms = async (req, res) =>{

    if(!(roleGuard(req.user.role).hasPrem)) return res.status(403).json({"msg": "You do not have premissions you are not a teacher."})
    

    const classrooms = await getAllCalssroomsService();
    return res.status(200).json({
        "classrooms": classrooms
    })
}

export {
    createClassroom,
    getAllCalssrooms
};