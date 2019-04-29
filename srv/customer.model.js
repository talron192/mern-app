const mongoose = require('mongoose');
const Shema = mongoose.Schema;

let Customer= new Shema({
    fullName:{
        type:String
    } ,
    email:{
        type:String
    } ,
    gender:{
        type:String
    },
    tz:{
        type:String
    } ,
    date:{
        type:String
    }, 
    issueDate:{
        type:String
    }, 
    houseNumber:{
        type:String
    }, 
    phoneNumber:{
        type:String
    }, 
    fax:{
        type:String
    },
    pathFolder:{
        type:String
    } 

});

module.exports= mongoose.model('customer',Customer);