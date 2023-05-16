const { Router } = require("express");
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const Tutor = require("../model/tutorSchema");
const jwt = require('jsonwebtoken');
const authenticate = require("../middleware/authenticatetutor");


router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });


router.post('/registertutor', async (req, res) => {
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



router.post('/logintutor', async (req, res) => {
    try
    {
    const { email, password } = req.body;

    if (!email || !password) {
            // return res.json({ message: "Plz Filled the data"})
    }



    const tutorLogin = await Tutor.findOne({ email: email });



if(tutorLogin){
    const isMatch = await bcrypt.compare(password,tutorLogin.password);

  


    if(isMatch){

        const token = await tutorLogin.generateAuthToken();
    
   
   
        res.cookie("jwtoken",token,{
            
            // httpOnly:true
        });
      
     
       res.status(422).json( {message: "tutor Signin Successfully" });
        
        
        
      
   
   
   
       }else{ 
           // res.json( {message: "invalid credentials" });
       }
        
   
    

   

  

}else{
    // res.json( {message: "invalid credentials" });
}

   

   } catch (err) {
     console. log(err)}


})




router.get('/usecookie',async (req,res)=>{
    console.log(`hehe bwoi`)
    const token = req.headers.authorization?.split(' ')[1];
       const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
       const rootUser = await Tutor.findOne({_id:verifyToken._id,"tokens.token":token});

        
       req.token =token;
       req.rootUser=rootUser;
    //    req.tutorId=rootUser._id;
       res.json(rootUser);
})


router.get('/logouttutor', (req, res) => {
    // Clear the token cookie on the client-side
    res.clearCookie('jwtoken',{path:'/'} );
  
    // Perform any additional server-side actions if required
    // For example, you could invalidate the token in your database or perform any other necessary cleanup
  
    res.json({ message: 'Logged out successfully' });
  });




module.exports = router;