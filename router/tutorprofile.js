const { Router } = require("express");
const express = require('express');
const router = express.Router();
const Tutor = require("../model/tutorSchema");

 

router.post('/tutorprofile', (req, res) => {
    const { name,email,password, location, gender, age, subject, bio, rate, experience } = req.body;
    const newTutor = new Tutor({
        name, 
        email,
        password,
        location, 
        gender, 
        age, 
        subject, 
        bio, 
        rate, 
        experience
    });
    newTutor.save()
        .then(() => {
            res.status(200).json({ message: 'Tutor data added successfully!' });
        })
        .catch(err => {
            console.log(`Error adding tutor: \${err}`);
            res.status(500).json({ message: 'Error adding tutor!' });
        });
});
module.exports = router;