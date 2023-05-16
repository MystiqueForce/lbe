const { default: mongoose } = require('mongoose');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const studentSchema = new mongoose.Schema({
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
    class: {
        type: String,
    },
    gpa: {
        type: String,
    },
    medium: {
        type: String,
    },
    profilePic: {
        type: String,
        default: '/avatar.png',
    },
    tokens: [
        {
            token: {
                type: String,

            }
        }
    ]
})


studentSchema.pre('save', async function (next) {
    if (this.isModified('password')) {

        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});


studentSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);

        this.tokens = this.tokens.concat({ token: token });

        await this.save();
        return token;
    } catch {

        console.log("error");
    }
}



const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
