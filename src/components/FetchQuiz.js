import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/play.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

function QuizSearch() {
  const [name, setName] = useState('');
  const [quiz, setQuiz] = useState(null);
  const [score, setScore] = useState(null);
  const location = useLocation();
  const userId = location.state.id;
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      if(!name){
        alert('Please enter a quiz name');
      }
      const response = await axios.get(`http://localhost:5000/getquiz/${name}`);
      setQuiz(response.data);
      setScore(null);
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
  };

  const getScore = (e) => {
    e.preventDefault();
    let score = 0;
    for (let i = 1; i <= 5; i++) {
      const userAnswer = document.querySelector(`input[name="ans${i}"]:checked`);
      if (userAnswer) {
        const correctAnswer = quiz[`answer${i}`];
        if (userAnswer.value.toLowerCase() === correctAnswer.toLowerCase()) {
          score++;
        }
      }
    }
    setScore(score);
    if(score<=1){
      alert('You got '+score+' out of 5 questions correct.Try again for a better score!');
    }
    if(score<3){
      alert(`Your score is ${score}/5. You can do better!`);
    }
    else{
      alert(`Your score is ${score}/5. Good job!`)
    }
  };

  return (
    <div className={styles.complete}>
      <div className={styles.paracontent}>
      <p className={styles.para}>We are excited to assist you in playing quiz! Get to know the available quizzes from get quizzes page.You can navigate back to home and go to get quizzes page or click on the button to directly navigate.Once you've decided on which quiz to play , just copy paste the name into the search bar, choose the answers and click on submit to get immediete feedback on your score!</p></div>
      <div className={styles.whole}>
      <div className={styles.buttonContainer}>
            <button className={styles.goBackButton} onClick={() => navigate('/quizzes', { state: { id: userId } })}>
              Go to fetch quizzes page
            </button> <br></br> <br></br>
            <button className={styles.goBackButton} onClick={() => navigate('/home', { state: { id: userId } })}>
              Go Back to Home
            </button>
      </div>
    <div className={styles.play}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={styles.boxx}/>
      <button onClick={handleSearch} className={styles.search}>Search</button>
      {quiz ? (
        <div>
          <h1>{quiz.quizname}</h1>
          <div className={styles.questionContainer}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={styles.question}>
                <h2>{quiz[`question${i}`]}</h2>
                <h3>Options:</h3>
                <div>
                  <input type="radio" id={`ans${i}a`} name={`ans${i}`} value={quiz[`options${i}`].a} />
                  <label htmlFor={`ans${i}a`}>{quiz[`options${i}`].a}</label>
                </div>
                <div>
                  <input type="radio" id={`ans${i}b`} name={`ans${i}`} value={quiz[`options${i}`].b} />
                  <label htmlFor={`ans${i}b`}>{quiz[`options${i}`].b}</label>
                </div>
                <div>
                  <input type="radio" id={`ans${i}c`} name={`ans${i}`} value={quiz[`options${i}`].c} />
                  <label htmlFor={`ans${i}c`}>{quiz[`options${i}`].c}</label>
                </div>
                <div>
                  <input type="radio" id={`ans${i}d`} name={`ans${i}`} value={quiz[`options${i}`].d} />
                  <label htmlFor={`ans${i}d`}>{quiz[`options${i}`].d}</label>
                </div>
              </div>
            ))}
          </div>
          <button onClick={getScore} type="submit">Submit</button>
        </div>
      ) : (
        <h1>No quiz found</h1>
      )}
    </div></div></div>
  );
}

export default QuizSearch;
