import express from 'express';
import AuthRout from './route/auth.route.js';
import AttendanceRout from './route/attendance.route.js';
import config from './config/config.js';
import { connect_db } from './config/database.js';


const app = express();


app.get(`${config.BASE_PATH}/health_check` , (req, res)  => {
    return res.status(200).json({
        "Msg": "Server healthy."
    });
});


app.use(`${config.BASE_PATH}`, AuthRout);
app.use(`${config.BASE_PATH}`, AttendanceRout);



connect_db();

if(config.NODE_ENV === "DEVELOPMENT"){
    
    app.listen(config.PORT, () => {
        console.log(`Server listening on port ${config.PORT}`);
    });
}


export default app;






