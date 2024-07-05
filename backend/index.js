const express=require("express");
const collection=require("./mongo");
const Quiz=require("./quizmongo");
const app=express();
const bcrypt=require("bcrypt");
const cors=require("cors");
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());
const _ = require('lodash');

app.get("/",cors(),(req,res)=>{
})

app.post('/', async (req, res) => {
    const { email, username, password } = req.body;
  
    try {
      const user = await collection.findOne({ username: username });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          res.json("exist");
        } else {
          res.json("error");
        }
      } else {
        res.json("Enter the details");
      }
    } catch (err) {
      res.json("Error occured establishing the connection");
    }
  });
app.get("/signup",cors(),(req,res)=>{
});
app.get('/quizzes', async (req, res) => {
    try {
      const quizzes = await Quiz.find({},{quizname:1});
      res.json(quizzes);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

app.post('/signup', async (req, res) => {
    const { email, username, password } = req.body;
    try {
      const user = await collection.findOne({ username: username });
      if (user) {
        return res.json("exist");
      } else {
        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
  
        const data = {
          email: email,
          username: username,
          password: hashedPassword
        };
  
        await collection.insertMany([data]);
        return res.json("not exist");
      }
    } catch (err) {
      return res.json("error");
    }
  });
  
app.get("/getquiz/:name",async (req,res)=>{
    const {name} =req.params;
    try {
        const quiz = await Quiz.findOne({ quizname :name });
        res.json(quiz); 
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
})
app.delete("/deletequiz/:quizname/:id", async (req, res) => {
    const quizname = req.params.quizname;
    const id = req.params.id;

    try {
        // Find the quiz document by quizname
        const quiz = await Quiz.findOne({ quizname });

        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        // Check if id matches the username field in the fetched quiz document
        if (quiz.username === id) {
            // Delete the quiz
            await Quiz.deleteOne({ quizname });
            return res.json({ message: `Quiz '${quizname}' deleted successfully` });
        } else {
            return res.status(403).json({ error: 'Unauthorized to delete this quiz' });
        }
    } catch (error) {
        console.error('Error deleting quiz:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.post("/addquiz",async (req,res)=>{
  try{
    await Quiz.insertMany(req.body)
    res.send("success");}
    catch(err){
      res.send("not unique")
      }
})
app.get("/getquizzes/:user",async (req,res)=>{
  const user = req.params.user;
  try {
    const quizzes = await Quiz.find({ username :user });
    res.json(quizzes);}
    catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });}
})
app.post("/editquiz/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const updatedData = req.body;
    // Find the quiz by name and update it
    await Quiz.findOneAndUpdate(
      { quizname: name }, // Filter criteria
      { 
        quizname: updatedData.quizname,
        question1: updatedData.question1,
        question2: updatedData.question2,
        question3: updatedData.question3,
        question4: updatedData.question4,
        question5: updatedData.question5,
        options1: updatedData.options1,
        options2: updatedData.options2,
        options3: updatedData.options3,
        options4: updatedData.options4,
        options5: updatedData.options5,
        answer1: updatedData.answer1,
        answer2: updatedData.answer2,
        answer3: updatedData.answer3,
        answer4: updatedData.answer4,
        answer5: updatedData.answer5,
      }// Options: return the updated document and run schema validators
    );
    res.send("success edit")
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({ error: "An error occurred while updating the quiz" });
  }
});


app.listen(5000,()=>{
    console.log("server is running")
})
