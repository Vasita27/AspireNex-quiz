import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/quizDelete.module.css'; // Import your CSS file

function QuizDelete() {
  const [quizzes, setQuizzes] = useState([]);
  const location = useLocation();
  const userId = location.state.id;
  const navigate = useNavigate();

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/getquizzes/${userId}`);
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const handleEdit = (quiz) => {
    navigate('/edit-quiz', { state: { quiz, id: userId } });
  };

  const handleDelete = async (quizId) => {
    try {
      await axios.delete(`http://localhost:5000/deletequiz/${quizId}/${userId}`);
      alert('Quiz deleted successfully');
      setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
      navigate("/home", { state: { id: userId } });
    } catch (error) {
      alert('You can only delete quizzes created by you');
      console.error('Error deleting quiz:', error);
    }
  };

  useEffect(() => {
    fetchQuizzes(); // Fetch quizzes once when the component mounts
  }, []);

  return (
    <div>
      {quizzes.length === 0 ? (
        <h1 style={{color:"white", textAlign:"center"}}>No quizzes to delete</h1>
      ) : (
        <table className={styles.quizTable}>
          <thead>
            <tr>
              <th>Quiz Name</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((quiz) => (
              <tr key={quiz._id}>
                <td>{quiz.quizname}</td>
                <td>
                  <button className={styles.deleteButton} onClick={() => handleDelete(quiz.quizname)}>Delete</button>
                </td>
                <td>
                  <button className={styles.editButton} onClick={() => handleEdit(quiz)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className={styles.buttonContainer}>
            <button className={styles.goBackButton} onClick={() => navigate('/home', { state: { id: userId } })}>
              Go Back to Home
            </button>
          </div>
    </div>
  );
}

export default QuizDelete;
