const mongoose=require('mongoose');

// const connection=mongoose.connect("mongodb://127.0.0.1:27017/assignment");

const connection=mongoose.connect("mongodb+srv://bharat:bharat1234@assignment.wunep4r.mongodb.net/?retryWrites=true&w=majority");

module.exports={connection}