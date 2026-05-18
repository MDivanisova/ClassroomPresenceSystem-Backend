import mongoose from "mongoose";

const classroomSchema = await mongoose.Schema({
    roomNumber : {type: Number, required: true},
    floor : {type: Number, required: true},
    campus: {type: Number, required: true},
    faculty: {type: String, required: true},
    type: {type:String, required: true, enum: ["Предавална","Лабораторија","Амфитеатар"]}
},{
    timestamps : true,
    toJSON: {
        transform: function(doc, ret){
            delete ret.__v;
        }
    } 
});


const classroomModel = mongoose.model("classroom", classroomSchema);


export default classroomModel;