import { ROLE } from "./enums"



const roleGuard = (role)=>{
    if(role === ROLE.regularProfesor || role === ROLE.notRegularProfesor){
        return {
            "hasPrem":true
        };
    }
    return {
        "hasPrem":false,
        "msg": "You do not have premissions you are not a teacher."
    };
}


export {
    roleGuard
}