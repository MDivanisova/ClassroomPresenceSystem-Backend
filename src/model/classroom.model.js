import mongoose from "mongoose";
import { TYPE } from "../utils/enums.js";

const classroomSchema = await mongoose.Schema({
    roomNumber: {type: Number, required: true},
    floor: {type: Number, required: true},
    campus: {type: Number, required: true},
    faculty: {type: String, default:"Информатички факултет",required: false},
    type: {type:String, required: true, enum: [TYPE.lectureHall, TYPE.laboratory, TYPE.amphitheatre]}
},{
    timestamps: true,
    toJSON: {
        transform: function(doc, ret){
            delete ret.__v;
        }
    } 
});


const classroomModel = mongoose.model("classroom", classroomSchema);


export default classroomModel;