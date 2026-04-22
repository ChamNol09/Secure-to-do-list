const jwt = require('jsonwebtoken');
const jwtConfig = require('../configs/jwt');
const userModel = require('../models/user');
const { email } = require('zod');

const isLogin = async (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.json({
                result: false,
                msg: "Unauthorized",
            })
        }

        let parts = authHeader.split(" ");
        if(parts.length !== 2 || parts[0] !== "Bearer"){
            return res.json({
                result: false,
                msg: "Invalid token format"
            });
        }
        let token = parts[1];
        let decoded = jwt.verify(token, jwtConfig.secret);
        
        let user = await userModel.getUserById(decoded.id);
        if(!user || user.length === 0){
            throw new Error("Invalid or expired token");
        }
        req.user = {
            id: user.id,
            email: user.email,
            role: user.role
        };     
        next();  
    }catch(error) {
        console.log(error);
        return res.json({
            result: false,
            msg: "Invalid or expired token",
        });
    }
}

module.exports = {
    isLogin
};