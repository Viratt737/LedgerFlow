const userModel = require('../Models/user.model');
const jwt = require('jsonwebtoken');
const tokenBlackListModel = require('../Models/blacklist.model');



async function authMiddleware(req, res, next){
     const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
     if(!token){
        return res.status(401).json({
            msg:"unauthorized access, token is missing"
        })
     }

     const isBlacklisted = await tokenBlackListModel.findOne({ token })
     if(isBlacklisted){
        return res.status(401).json({
            msg : "Unauthorized access, token is invalid !!"
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

async function authSystemUserMiddleware(req, res, next){
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({
            msg : "Unauthorized access, token is missing"
        })
    }


     const isBlacklisted = await tokenBlackListModel.findOne({ token })
     if(isBlacklisted){
        return res.status(401).json({
            msg : "Unauthorized access, token is invalid !!"
        })
     }


    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.userId).select('+systemUser');
        if(!user.systemUser){
            return res.status(403).json({
                msg:"Forbidden access, not a system user"
            })
        }
     req.user = user; 
     next()
    }catch(err){
        console.log(err);
         return res.status(401).json({
            msg : "Unauthorized access, token is missing"
        })
    }
}


module.exports = {
    authMiddleware,
    authSystemUserMiddleware
}