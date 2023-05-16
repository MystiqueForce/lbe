const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const tutorSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    phone: {
        type: Number,
    },
    location: {
        type: String,
    },
    gender: {
        type: String,
    },
    age: {
        type: Number,
    },
    subject: {
        type: String,
    },
    bio: {
        type: String,
    },
    experience: {
        type: String,
    },
    rate: {
        type: Number,
    },
    profilePic: {
        type: String,
        default: '/avatar.png',
    },
    status: {
        type: Number,
        enum: [0, 1, 2],
        default: 1
    },
    tokens: [
        {
            token: {
                type: String,

            }
        }
    ]
})


tutorSchema.pre('save',async function (next){
     if(this.isModified('password')){
        
    this.password= await bcrypt.hash(this.password,12);
    }
     next();
 });


 tutorSchema.methods.generateAuthToken = async function(){
     try{
         let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);

         this.tokens=this.tokens.concat({token:token});

         await this.save();
         return token;
     } catch{

        console.log("error");
     }
 }



const Tutor = mongoose.model('Tutor', tutorSchema);
module.exports = Tutor;
