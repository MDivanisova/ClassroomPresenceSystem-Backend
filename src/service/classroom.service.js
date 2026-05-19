import classroomModel from "../model/classroom.model.js"



const creatClassroomService = async (roomNumber, floor, campus, faculty, type)=>{
    const classroom = new classroomModel({
        roomNumber: roomNumber,
        floor: floor,
        campus: campus,
        faculty: faculty,
        type: type
    })

    classroom.save()

    return classroom._id;
}

const getAllCalssroomsService = async () => {
    const classrooms = await classroomModel.find();

    return classrooms;

}

export {
    creatClassroomService,
    getAllCalssroomsService
}