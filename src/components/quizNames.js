import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/quizlist.module.css'; // Assuming you have a CSS module for styling
import { useLocation,useNavigate } from "react-router-dom"; 
function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const history=useNavigate();
    const location = useLocation();
    const a =location.state.id;

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/quizzes'); // Adjust URL as per your backend setup
      setQuizzes(response.data);
      const a=document.getElementsByClassName(styles.quizList);
      a[0].style.visibility="visible";
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const handleFetchQuizzes = () => {
    fetchQuizzes();
  };

  return (
    <div className={styles.main}>
      <div className={styles.paracontent}>
        <p className={styles.para}>Hey there! Just click on the button to get to know what the quizzes are and then you can copy the name of the quiz you would like to try.Click on the play quiz to directly navigate to play quiz page.</p>
      </div>
    <div className={styles.quizListContainer}>
      <div className={styles.fade}>
      <p className={styles.title}>All Quizzes</p>
      <button className={styles.fetchButton} onClick={handleFetchQuizzes}>Fetch Quizzes</button></div>
      <ul className={styles.quizList}>
        {quizzes.map(quiz => (
          <li key={quiz._id} className={styles.quizItem}>{quiz.quizname}</li>
        ))}
      </ul>
    </div>
    <div style={{textAlign:"center", position:"relative" ,top:"30px"}} className={styles.fade}>
        <button className={styles.goplay} onClick={()=>history("/getquiz",{state:{id:a}})}>Play Quiz</button>
      </div>
    </div>
  );
}

export default QuizList;
