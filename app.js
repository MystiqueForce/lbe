const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const { default: mongoose } = require('mongoose');
const app = express();
app.use(cookieParser());


dotenv.config({ path: './.env' });
require('./db/connection');
app.use(express.json());

app.use(require('./router/auth'));
app.use(require('./router/authtutor'));
app.use(require('./router/authadmin'));
app.use(require('./router/assignments'));
app.use(require('./tutors/editProfile'));
app.use(require('./middleware/authenticatetutor'));
app.use(require('./router/tutorprofile'));
app.use(require('./router/studentprofile'));



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


// const User = require('./model/userSchema');

const PORT = process.env.PORT;





app.get('/register', (req, res) => {
    res.send("Hello world from the server");
});

const Tutor = require('./model/tutorSchema');
// get route to get a list of all data
//,{ name: 1,_id:0}  for only name add this
app.get('/trial', async (req, res) => {
    try {
        // Get the list of tutors waiting for approval from temporary storage
        const tutors = await Tutor.find({ 'status': 1 }, { '_id': 0 }).exec();

        const tutorArray = [];

        for (const tutor of tutorArray) {
            tutorArray.push(tutor.name);
        }
        console.log(tutors)
        // const tutors = await Tutor.find({}).exec()
        res.status(200).json(tutors)
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal server error' })
    }
})
/////
//Review tutors page - Getting tutors with status 1.
app.get('/status1', async (req, res) => {
  try {
      // Get the list of tutors waiting for approval from temporary storage
      const tutors = await Tutor.find({ 'status': 1 }, { '_id': 0 }).exec();

      const tutorArray = [];

      for (const tutor of tutorArray) {
          tutorArray.push(tutor.name);
      }
      console.log(tutors)
      // const tutors = await Tutor.find({}).exec()
      res.status(200).json(tutors)
  }
  catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Internal server error' })
  }
})
//Tutors page - Getting tutors with status 2.
app.get('/status2', async (req, res) => {
  try {
      // Get the list of tutors waiting for approval from temporary storage
      const tutors = await Tutor.find({ 'status': 2 }, { '_id': 0 }).exec();

      const tutorArray = [];

      for (const tutor of tutorArray) {
          tutorArray.push(tutor.name);
      }
      console.log(tutors)
      // const tutors = await Tutor.find({}).exec()
      res.status(200).json(tutors)
  }
  catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Internal server error' })
  }
})
//Deleting a user based on email - completely working
app.delete('/:email', async (req, res) => {
  try {
    const email = req.params.email;
    console.log(email)
    const result = await Tutor.deleteOne({ email });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});
//Updating status from 1 to 2 when tutor approved to display on tutor list
app.put('/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const result = await Tutor.updateOne({ email }, { status: 2 });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});
// --------------------------------------------------------------------------------------------------
//render the list of tutors to the table in student dashboard
app.get('/getlist', async (req, res) => {
    try {
      // Get the list of tutors waiting for approval from temporary storage
      const tutors = await Tutor.find({}).exec()
      res.status(200).json(tutors)
    } 
    catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Internal server error' })
    }
  })

// --------------------------------------------------------------------------------------------------

//get the list of my tutors stored in the database
const MyTutor = require('./model/myTutorSchema');
app.post('/add-tutor', (req, res) => {
    const newTutor =  MyTutor({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email
    });
  
    newTutor.save()
      .then(() => res.json('Tutor added successfully'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  app.get('/getMyTutorlist', async (req, res) => {
    try {
      // Get the list of tutors waiting for approval from temporary storage
      const tutors = await MyTutor.find({}).exec()
      res.status(200).json(tutors)
    } 
    catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Internal server error' })
    }
  })

// ---------------------------------------------------------------------------------------------------
const Student = require('./model/userSchema');

app.get('/studentdetails', async (req, res) => {

    try {

        const students = await Student.find({}).exec()

        const studentArray = [];




        for (const student of studentArray) {

            studentArray.push(student);

        }

        console.log(students)

        res.status(200).json(students)

    }

    catch (err) {

        console.error(err)

        res.status(500).json({ message: 'Internal server error' })

    }

})

app.listen(PORT, () => {
    console.log(`waah modi ji waah server is running at port no ${PORT}`);
});