import mongoose from "mongoose";
import { pwHash, pwCompare } from "../utils/pw.hash.js";
import { ROLE } from "../utils/enums.js";
import balkanTime from "../utils/time.helper.js";

const userSchema = await mongoose.Schema({
    index: {type: String, required: true},
    name: {type: String, required: false},
    surname: {type: String, required: false},
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: false},
    role: {type: String, required: true, enum: [ROLE.regularProfesor, ROLE.notRegularProfesor, ROLE.regularStudent, ROLE.notRegularStuden]}
},{
    timestamps: true,
    toJSON: {
        transform: function(doc, ret){
            delete ret.__v;
            delete ret.password;
        } 
    }
});


userSchema.pre("save", async function(){
    if(this.isModified("password")){
        this.password = await pwHash(this.password);
    }
    this.updatedAt = balkanTime();
});


userSchema.methods.pwCmp = async function (pw){
    return await pwCompare(pw, this.password);
};

userSchema.methods.pwOmit = function(){
    const obj =  this.toObject();
    delete obj.password;

    return obj;
};


const userModel = mongoose.model("user", userSchema);


export default userModel;