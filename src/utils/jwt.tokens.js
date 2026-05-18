import jwt from 'jsonwebtoken'
import config from '../config/config.js'

const generateToken = (user)=>{
    const token = jwt.sign(user, config.JWT_KEY, {expiresIn: "1h"})

    return token;
};

const verifyToken = (token)=>{
    try {
    const user = jwt.verify(token, config.JWT_KEY);
    return { valid: true, user };
  } catch (err) {
    return { valid: false, user: undefined };
  }
}


export {
    generateToken,
    verifyToken
};