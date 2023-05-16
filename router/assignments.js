const { Router } = require("express");
const multer = require("multer");
const path = require("path");

const Assign = require("../model/AssignUploadSchema");
// const Comment = require("../models/comment");

const router = Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.resolve(`./public/uploads/`));
//   },
//   filename: function (req, file, cb) {
//     const fileName = `${Date.now()}-${file.originalname}`;
//     cb(null, fileName);
//   },
// });

// const upload = multer({ storage: storage });

// router.get("/add-new", (req, res) => {
//   return res.render("addAssign", {
//     user: req.user,
//   });
// });

router.post('/assign', async (req, res) => {
    const { subject,topic,body} = req.body;
       console.log(subject);
    //    res.json({message:req.body});


    try {
      
            const assign = new Assign({ subject,topic,body });
            const assignUpload = await assign.save();

     if (assignUpload) {
       
                res.json({ message: "Assignment added successfuly" });
                
     }


    } catch (err) {
              console. log(err);
    }

});

router.get("/assign", async (req, res) => {
    try {
      // Get the list of tutors waiting for approval from temporary storage
  
    //   } catch (err) {
    //             console. log(err);
    //   }
      const assign = await Assign.find({}).exec();
      res.status(200).json(assign);
    } catch (err) {
      console.error(err);
    }
  
  });

module.exports = router;
