const mongoose = require('mongoose');

const optSchema = new mongoose.Schema({
  a: { type: String, required: true },
  b: { type: String, required: true },
  c: { type: String, required: true },
  d: { type: String, required: true },
});

const newSchema=new mongoose.Schema({
    quizname:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
    },
    question1:{
        type:String,
        required:true,
    },
    options1:{
        type:optSchema,
        required:true,
    },
    answer1:{
        type:String,
        required:true,
    },
    question2:{
        type:String,
        required:true,
    },
    options2:{
        type:optSchema,
        required:true,
    },
    answer2:{
        type:String,
        required:true,
    },
    question3:{
        type:String,
        required:true,
    },
    options3:{
        type:optSchema,
        required:true,
    },
    answer3:{
        type:String,
        required:true,
    },
    question4:{
        type:String,
        required:true,
    },
    options4:{
        type:optSchema,
        required:true,
    },
    answer4:{
        type:String,
        required:true,
    },
    question5:{
        type:String,
        required:true,
    },
    options5:{
        type:optSchema,
        required:true,
    },
    answer5:{
        type:String,
        required:true,
    }
})

const Quiz = mongoose.model('Quiz', newSchema);

module.exports = Quiz;
