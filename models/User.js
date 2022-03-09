const mongoose = require('mongoose')



const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxlength: [30, 'Name can not be more than 30 characters'],
        minlength:[2, 'Name can not be less than 2 characters'],
        trim: true,
        unique: true
    },
    username: {
        type: String,
        required: [true, 'Please provide u username'],
        unique: true,
        maxlength: [13, 'Name can not be more than 30 characters'],
        minlength: [4, 'Name can not be less than 4 characters'],
        trim: true,
        unique: true
        
    },
    age: {
        type: Number,
        required: true,
        min: [18 ,'age must be i8 and above'],
        
    },
    dateofbirth: {
        type: Date,
        required: [true,'please provide date of birth']
        
    },
    bvn: {
        type: Number,
        required: [true, 'please provide bnv'],
        maxlength:[10, 'can not be more than 10 numbers' ],
        minlength: [10, 'can not be less than 10'],
        unique: true
        
    },
    nin: {
        type: Number,
        required: [true, 'please provide NIN'],
        maxlength: [11, 'cant not be more than 11 numbers'],
        minlength: [11, 'can not be more less than 11'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        maxlength: [128, 'email can\'t be grater than 128 characters'],
        index: true
    },
    accountnumber:{
        type: Number,
        default:Math.ceil(Math.random()*10000000000), 
        unique: true
    },
     
    phonenumber: {
       type: Number,
       required: true,
       maxlength: [11, 'number must be 11 digit'],
       minlength: [11, 'number should not be less than 11'],
       unique: true,
       trim : true,
    },
    
    image: {
        type: String,
       
    },
    
    isDeleted: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    


},
{ timestamps: true}
 );

module.exports = mongoose.model('Customer', customerSchema)