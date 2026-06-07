import express from 'express';
import authRout from './route/auth.route.js';
import attendanceRout from './route/attendance.route.js';
import config from './config/config.js';
import { connectDB } from './config/database.js';
import middle from './middleware/auth.middleware.js';
import { errorHandler } from './middleware/zod.handler.js';
import classroomRout from './route/classroom.route.js';
import attendeeRout from './route/attendees.route.js';

const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    next();
});

app.use(express.json());




app.get(`${config.BASE_PATH}/health_check` , (req, res)  => {
    return res.status(200).json({
        "Msg": "Server healthy."
    });
});




app.use(`${config.BASE_PATH}/au`, authRout);

app.use(`${config.BASE_PATH}/at`, middle, attendanceRout);

app.use(`${config.BASE_PATH}/c`, middle, classroomRout);

app.use(`${config.BASE_PATH}/a`, middle, attendeeRout);


app.use(errorHandler);


connectDB();

if(config.NODE_ENV === "DEVELOPMENT"){
    
    app.listen(config.PORT, () => {
        console.log(`Server listening on port ${config.PORT}`);
    });
}


export default app;






