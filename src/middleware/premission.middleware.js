import { ROLE } from "../utils/enums.js"



const hasPriveleges = (req, res, next)=>{
    if(req.user.role == ROLE.regularProfesor || req.user.role == ROLE.notRegularProfesor || req.user.role == ROLE.admin){
        return next();
    }
    else{
        return res.status(403).json({
            "msg": "You do not have premissions you are not a teacher or and administrator."
        }); 
    }
};
const isAdmin = (req, res, next)=>{
    if(req.user.role == ROLE.admin){
        return next();
    }
    else{
        return res.status(403).json({
            "msg": "You do not have premissions you are not an administrator."
        });
    }
};

export {
    hasPriveleges,
    isAdmin
}