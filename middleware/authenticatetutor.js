 const jwt  = require('jsonwebtoken');
 const cookieParser = require('cookie-parser');
 const Tutor = require("../model/tutorSchema");
 
 const express = require('express');
 const app = express();

// Use the cookie-parser middleware
app.use(cookieParser());

const Authenticate = async(req,res,next)=>{
    try{

       const token = req.cookies.jwtoken;
    //    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    //    const rootUser = await Tutor.findOne({_id:verifyToken._id,"tokens.token":token});

        
    //    req.token =token;
    //    req.rootUser=rootUser;
    //    req.tutorId=rootUser._id;
    //    res.json(rootUser);

       next();

    }catch{
        // console.log("error");
    }

}


module.exports = Authenticate;