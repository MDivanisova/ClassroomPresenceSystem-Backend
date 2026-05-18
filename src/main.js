import express from 'express';
import authRout from './route/auth.route.js';
import attendanceRout from './route/attendance.route.js';
import config from './config/config.js';
import { connectDB } from './config/database.js';


const app = express();


app.get(`${config.BASE_PATH}/health_check` , (req, res)  => {
    return res.status(200).json({
        "Msg": "Server healthy."
    });
});


app.use(`${config.BASE_PATH}`, authRout);
app.use(`${config.BASE_PATH}`, attendanceRout);



connectDB();

if(config.NODE_ENV === "DEVELOPMENT"){
    
    app.listen(config.PORT, () => {
        console.log(`Server listening on port ${config.PORT}`);
    });
}


export default app;






