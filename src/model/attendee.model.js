import mongoose from "mongoose";
import { toJSONSchema, transform } from "zod";

const attendeeSchema = await mongoose.Schema({
    attendee: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
    attendance: {type: mongoose.Schema.Types.ObjectId, ref: "attendance", required: true},
    enterIn: {type: Date, reuired: true}    
},{
    timestamps: true,

    toJSON: {
        transform: function (doc, ret){
            delete ret.__v;
        }
    }
});


const attendeeModel = mongoose.model("attendee", attendeeSchema);

export default attendeeModel;