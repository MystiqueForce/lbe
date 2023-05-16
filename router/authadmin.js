const { Router } = require("express");
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const Admin = require("../model/adminSchema");
const jwt = require('jsonwebtoken');


router.get('/', (req, res) => {
res.send( `Hello world from the server rotuer js`);
});

router.get('/registeradmin', (req, res) => {
    res.send( `Hello world from the server rotuer js`);
    });

router.post('/registeradmin', async (req, res) => {
    const {email, password} = req.body;
       console.log(email);
    //    res.json({message:req.body});


    try {
      const adminExists = await Admin.findOne({ email: email });

      if (adminExists) {
         return res.json({ error: "Email already Exist" });
      }

            const admin = new Admin({ email, password});

           

            
            const adminRegister = await admin.save();

     if (adminRegister) {
       
                res.json({ message: "admin registered successfuly" });
     }


    } catch (err) {
              console. log(err);
    }

})



router.post('/loginadmin', async (req, res) => {
    try
    {
    const { email, password } = req.body;

    if (!email || !password) {
            return res.json({ message: "Plz Filled the data"})
    }

    const adminLogin = await Admin.findOne({ email: email });

if(adminLogin){
    const isMatch = await bcrypt.compare(password,adminLogin.password);

  

    if(isMatch){

     res.json( {message: "admin Signin Successfully" });
     const token = await adminLogin.generateAuthToken();

    }else{ 
        res.json( {message: "invalid credentials" });
    }

}else{
    res.json( {message: "invalid credentials" });
}

   

   } catch (err) {
     console. log(err)}
})








module.exports = router;