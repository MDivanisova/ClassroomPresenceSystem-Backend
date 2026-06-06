import { verifyToken } from '../utils/jwt.tokens.js';

const middle = (req, res, next)=>{

    const token  = req.headers.authorization;
    const result = verifyToken(token);
    
    
    if(result && result.valid){
        req.user = result.user;
        return next();
    }
    else{
        return res.status(301).json({
            "msg":"Access denied unauthorized, please login."
        });
    }
    
}

export default middle;