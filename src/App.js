import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import AddQuiz from "./components/AddQuiz";
import QuizSearch from "./components/FetchQuiz";
import QuizList from "./components/quizNames";
import QuizDelete from "./components/deleteQuiz";
function App(){
  return(
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addquiz" element={<AddQuiz />} />
          <Route path="/getquiz" element={<QuizSearch />} />
          <Route path="/quizzes" element={<QuizList />} />
          <Route path="/deletequiz" element={<QuizDelete />} />
          <Route path="/edit-quiz" element={<AddQuiz />}/>
        </Routes>
      </Router>
    </div>
  )
}
export default App;