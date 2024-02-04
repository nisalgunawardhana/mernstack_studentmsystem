const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const studentSchema = new Schema({

    name : {
        type : String,
        required:true,
    },

    age : {
        type : Number,
        required:true,
    },
    gender : {
        type : String,
        required:true,
    }
})

const Student = Mongoose.model("student",studentSchema);

module.exports = Student;