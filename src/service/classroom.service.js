import classroomModel from "../model/classroom.model.js"



const creatClassroomService = async (roomNumber, floor, campus, faculty, type)=>{
    const isDuplicat = await classroomModel.findOne({roomNumber: roomNumber, floor: floor, campus: campus, faculty: faculty, type: type});
        if(isDuplicat){
            return {
                "statusCode":409,
                "msg":"Classroom already exist"
            };
        }

    const classroom = new classroomModel({
        roomNumber: roomNumber,
        floor: floor,
        campus: campus,
        faculty: faculty,
        type: type
    })

    await classroom.save()

    return classroom._id;
}

const getAllCalssroomsService = async () => {
    const classrooms = await classroomModel.find();

    return classrooms;

}

const removeClassroomService = async(classroomID)=>{
    
    const classroom = await classroomModel.findOne({_id:classroomID});
    if(!classroom){
        return {
            "statusCode": 404,
            "msg": "classroom does not exist"
        }
    }

    const removeres = await classroomModel.deleteOne({_id:classroomID})
    return {
        "statusCode": 200,
        "msg": "classroom removed succesfully"
    }
};

const editClassroomService = async(classroomID,roomNumber,floor,campus,faculty,type)=>{

    const classroom = await classroomModel.findOne({_id:classroomID});
    if(!classroom){
        return {
            "statusCode": 404,
            "msg": "classroom does not exist"
        }
    }

    const isDuplicat = await classroomModel.findOne({roomNumber: roomNumber, floor: floor, campus: campus, faculty: faculty, type: type});
        if(isDuplicat){
            return {
                "statusCode":409,
                "msg":"Classroom already exist"
            };
        }

    classroom.campus = campus;
    classroom.roomNumber = roomNumber;
    classroom.floor = floor;
    classroom.faculty = faculty;
    classroom.type = type;

    await classroom.save();

    return {
        "msg":"Succesfully update",
        "statusCode":200
    };

};

export {
    creatClassroomService,
    getAllCalssroomsService,
    removeClassroomService,
    editClassroomService
}