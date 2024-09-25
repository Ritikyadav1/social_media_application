const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/miniproject");
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    age:Number,
    username:String,
    password:String,
    profilepic: {
        type: String,
        default: "default.jpg"
    },
    posts:[
        {type: mongoose.Types.ObjectId, ref: "post"}
    ]
});

module.exports = mongoose.model('User', userSchema);
