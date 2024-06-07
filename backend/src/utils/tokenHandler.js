import jwt from 'jsonwebtoken';
const verifyToken = (token,secret)=>{
    try {
        return  jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

export {verifyToken}