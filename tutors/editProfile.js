const { Router } = require("express");
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const Tutor = require("../model/tutorSchema");
const jwt = require('jsonwebtoken');





router.post('/editprofile', async (req, res) => {
    const { name, email, password, phone, age} = req.body;
       console.log(email);
    //    res.json({message:req.body});


    try {
      const tutorExists = await Tutor.findOne({ email: email });

      if (tutorExists) {
         return res.json({ error: "Email already Exist" });
      }

            const tutor = new Tutor({ name, email, password, phone, age });




            const tutorRegister = await tutor.save();




     if (tutorRegister) {

                res.json({ message: "tutor registered successfuly" });

     }


    } catch (err) {
              console. log(err);
    }

})







module.exports = router;