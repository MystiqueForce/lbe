const { Router } = require("express");
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const Student = require("../model/userSchema");
const jwt = require('jsonwebtoken');

router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


router.get('/', (req, res) => {
res.send( `Hello world from the server router js`);
});

router.get('/register', (req, res) => {
    res.send( `Hello world from the server router js`);
    });

router.post('/register', async (req, res) => {
    const { name, email, password, phone, age} = req.body;
       console.log(email);
    //    res.json({message:req.body});


    try {
      const userExist = await Student.findOne({ email: email });

      if (userExist) {
         return res.json({ error: "Email already Exist" });
      }

            const user = new Student({ name, email, password, phone, age });

           

            
            const userRegister = await user.save();

     if (userRegister) {
       
                res.json({ message: "User registered successfuly" });
     }


    } catch (err) {
              console. log(err);
    }

})



router.post('/login', async (req, res) => {
    try
    {
    const { email, password } = req.body;

    if (!email || !password) {
            
    }
    

    const userLogin = await Student.findOne({ email: email });

if(userLogin){
    const isMatch = await bcrypt.compare(password,userLogin.password);

  

    if(isMatch){

    
     const token = await userLogin.generateAuthToken();

     
     res.cookie("jwtoken",token,{
            
      // httpOnly:true
  });

     res.json( {message: "user Signin Successfully" });

    }else{ 
        
    }

}else{
    
}

   

   } catch (err) {
     console. log(err)}
})




router.get('/usecookiestudent',async (req,res)=>{
  console.log(`hehesssss bwoi`)
  const token = req.headers.authorization?.split(' ')[1];
     const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
     const rootUser = await Student.findOne({_id:verifyToken._id,"tokens.token":token});

      
     req.token =token;
     req.rootUser=rootUser;
    //  req.tutorId=rootUser._id;
     res.json(rootUser);
})

router.get('/logout', (req, res) => {
  // Clear the token cookie on the client-side
  res.clearCookie('jwtoken',{path:'/'} );

  // Perform any additional server-side actions if required
  // For example, you could invalidate the token in your database or perform any other necessary cleanup

  res.json({ message: 'Logged out successfully' });
});

// router.get('/api/data', async (req, res) => {
//     try {
//       const name =  req.query.name;// Get the name query parameter
  
//       // Fetch data from MongoDB where name is "Sam"
//       const data = await Student.findOne({ name: name });
  
//       res.json(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       res.status(500).json({ error: 'Error fetching data' });
//     }
//   });






module.exports = router;