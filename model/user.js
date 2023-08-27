

const { default: mongoose, Schema } = require("mongoose");

// coonst mongoose

// const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
        required:true,
    },
    phone_no:{
        type:String,
    },
    dob:{
        type: Date,
    }
});

module.exports = mongoose.model('User', UserSchema);

// default
// named 