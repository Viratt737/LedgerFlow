const userModel = require('../Models/user.model');
const jwt = require('jsonwebtoken');

async function authMiddleware(req, res, next){
     const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
     if(!token){
        return res.status(401).json({
            msg:"unauthorized access, token is missing"
        })
     }

     try{
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       const user = await userModel.findById(decoded.userId);
       req.user = user;
       next()
     }catch(err){
        console.log(err)
        return res.status(401).json({
            msg:"unauthorized access, token is missing"
        })
     }
}

module.exports = {
    authMiddleware
}