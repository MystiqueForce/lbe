const { Router } = require("express");
const express = require('express');
const router = express.Router();
const Student = require("../model/userSchema");

 
router.post('/studentprofile', (req, res) => {
    const { name,email,password, location, gender, age,gpa,medium, subject, bio} = req.body;
    const newStudent = new Student({
        name, 
        email,
        password,
        location, 
        gender, 
        age, 
        gpa,
        medium,
       
        subject, 
        bio
    });
    newStudent.save()
        .then(() => {
            res.status(200).json({ message: 'Student data added successfully!' });
        })
        .catch(err => {
            console.log(`Error adding tutor: \${err}`);
            res.status(500).json({ message: 'Error adding tutor!' });
        });
});
module.exports = router;