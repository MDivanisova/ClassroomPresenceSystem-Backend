import mongoose from "mongoose";


const attendanceShcema = await mongoose.Schema({
    classroom: {type: mongoose.Schema.Types.ObjectId, ref: "classroom", required: true},
    organizer: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
    participants: [{type: mongoose.Schema.Types.ObjectId, ref: "atendee", required: false}],
    startOn: {type: Date, required: true},
    endOn: {type: Date, default:null,required: false},
    title: {type: String, required: true}
},{
    timestamps: true,
    toJSON: {
        transform: function(doc, ret){
            delete ret.__v;
        }
    }
});

const attendanceModel = mongoose.model("attendance", attendanceShcema);

export default attendanceModel;