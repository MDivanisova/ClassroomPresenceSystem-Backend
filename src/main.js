import express from 'express';
import authRout from './route/auth.route.js';
import attendanceRout from './route/attendance.route.js';
import config from './config/config.js';
import { connectDB } from './config/database.js';
import middle from './middleware/auth.middleware.js';
import { errorHandler } from './middleware/zod.handler.js';
import classroomRoute from './route/classroom.route.js';

const app = express();


app.use(express.json());




app.get(`${config.BASE_PATH}/health_check` , (req, res)  => {
    return res.status(200).json({
        "Msg": "Server healthy."
    });
});




app.use(`${config.BASE_PATH}/au`, authRout);

app.use(`${config.BASE_PATH}/at`, middle, attendanceRout);

app.use(`${config.BASE_PATH}/c`, middle, classroomRoute);


app.use(errorHandler);


connectDB();

if(config.NODE_ENV === "DEVELOPMENT"){
    
    app.listen(config.PORT, () => {
        console.log(`Server listening on port ${config.PORT}`);
    });
}


export default app;






