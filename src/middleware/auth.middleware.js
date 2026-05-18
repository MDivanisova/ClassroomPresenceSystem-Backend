import { verifyToken } from '../utils/jwt.tokens.js';

const middle = (req, res, next)=>{
    const token  = req.headers.authorization;
    const result = verifyToken(token);
    if(result.valid){
        next();
    }
    return res.status(301).json({
        "msg":"Access denied unaothorized, please login."
    });
}

export default middle;