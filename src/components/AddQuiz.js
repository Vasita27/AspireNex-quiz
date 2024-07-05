import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/add.module.css"; // Ensure correct path to your CSS file

function QuizForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state.id;
  const { quiz, userId } = location.state || {};
  const [quizname, setQuizname] = useState(quiz?.quizname || "");
  const [question1, setQuestion1] = useState(quiz?.question1 || "");
  const [options1, setOptions1] = useState(quiz?.options1 || { a: "", b: "", c: "", d: "" });
  const [answer1, setAnswer1] = useState(quiz?.answer1 || "");
  const [question2, setQuestion2] = useState(quiz?.question2 || "");
  const [options2, setOptions2] = useState(quiz?.options2 || { a: "", b: "", c: "", d: "" });
  const [answer2, setAnswer2] = useState(quiz?.answer2 || "");
  const [question3, setQuestion3] = useState(quiz?.question3 || "");
  const [options3, setOptions3] = useState(quiz?.options3 || { a: "", b: "", c: "", d: "" });
  const [answer3, setAnswer3] = useState(quiz?.answer3 || "");
  const [question4, setQuestion4] = useState(quiz?.question4 || "");
  const [options4, setOptions4] = useState(quiz?.options4 || { a: "", b: "", c: "", d: "" });
  const [answer4, setAnswer4] = useState(quiz?.answer4 || "");
  const [question5, setQuestion5] = useState(quiz?.question5 || "");
  const [options5, setOptions5] = useState(quiz?.options5 || { a: "", b: "", c: "", d: "" });
  const [answer5, setAnswer5] = useState(quiz?.answer5 || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let i = 1; i <= 5; i++) {
      if (
        document.getElementById(i).value !== document.getElementById(i + "a").value &&
        document.getElementById(i).value !== document.getElementById(i + "c").value &&
        document.getElementById(i).value !== document.getElementById(i + "b").value &&
        document.getElementById(i).value !== document.getElementById(i + "d").value
      ) {
        alert("Correct answer should be one among the options");
        return;
      }
    }
    try {
      const response = await axios.post(
        quiz ? `http://localhost:5000/editquiz/${quiz.quizname}` : "http://localhost:5000/addquiz",
        {
          quizname,
          username,
          question1,
          question2,
          question3,
          question4,
          question5,
          options1,
          options2,
          options3,
          options4,
          options5,
          answer1,
          answer2,
          answer3,
          answer4,
          answer5,
        }
      );
      if (response.data === "success edit" || response.data === "success") {
        alert(`Quiz successfully ${quiz ? "updated" : "added"}!`);
      } 
      if(response.data === "success edit"){
        navigate("/deletequiz", { state: { id: username } });
      }
      if (response.data === "success") {
        setQuizname("");
        setQuestion1("");
        setOptions1({ a: "", b: "", c: "", d: "" });
        setAnswer1("");
        setQuestion2("");
        setOptions2({ a: "", b: "", c: "", d: "" });
        setAnswer2("");
        setQuestion3("");
        setOptions3({ a: "", b: "", c: "", d: "" });
        setAnswer3("");
        setQuestion4("");
        setOptions4({ a: "", b: "", c: "", d: "" });
        setAnswer4("");
        setQuestion5("");
        setOptions5({ a: "", b: "", c: "", d: "" });
        setAnswer5("");
      } else if (response.data === "not unique") {
        alert("Quiz names must be unique");
      }
    } catch (error) {
      alert(`An error occurred while ${quiz ? "updating" : "adding"} the quiz.`);
      navigate("/home", { state: { id: username } });
    }
  };

  return (
    <div className={styles.que}>
      <h1>{quiz ? "Edit" : "Add"} questions to your quiz</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles["input-container"]}>
          <label htmlFor="quizname" className={styles["input-label"]}>
            Quiz Name:
          </label>
          <input
            type="text"
            name="quizname"
            value={quizname}
            onChange={(e) => setQuizname(e.target.value)}
            className={styles.bluebox}
            placeholder="Enter Quiz Name"
            required
          />
        </div>

        {/* Question 1 */}
        <div className={styles["input-container"]}>
          <label htmlFor="question1" className={styles["input-label"]}>
            Question 1:
          </label>
          <input
            type="text"
            name="question1"
            className={styles.bluebox}
            value={question1}
            onChange={(e) => setQuestion1(e.target.value)}
            placeholder="Enter Question 1"
            required
          />
        </div>
        {/* Options for Question 1 */}
        <div className={styles["input-container"]}>
          <label className={styles["input-label"]}>Options for Question 1:</label>
          <input
            type="text"
            name="q1_option1"
            className={styles.bluebox}
            id="1a"
            value={options1.a}
            onChange={(e) => setOptions1({ ...options1, a: e.target.value })}
            placeholder="Option 1 for Question 1"
            required
          />
          <input
            type="text"
            name="q1_option2"
            id="1b"
            value={options1.b}
            onChange={(e) => setOptions1({ ...options1, b: e.target.value })}
            className={styles.bluebox}
            placeholder="Option 2 for Question 1"
            required
          />
          <input
            type="text"
            name="q1_option3"
            id="1c"
            value={options1.c}
            onChange={(e) => setOptions1({ ...options1, c: e.target.value })}
            className={styles.bluebox}
            placeholder="Option 3 for Question 1"
            required
          />
          <input
            type="text"
            name="q1_option4"
            id="1d"
            value={options1.d}
            onChange={(e) => setOptions1({ ...options1, d: e.target.value })}
            className={styles.bluebox}
            placeholder="Option 4 for Question 1"
            required
          />
        </div>
        {/* Correct answer for Question 1 */}
        <div className={styles["input-container"]}>
          <label htmlFor="q1_answer" className={styles["input-label"]}>
            Correct Answer for Question 1:
          </label>
          <input
            type="text"
            name="q1_answer"
            value={answer1}
            id="1"
            onChange={(e) => setAnswer1(e.target.value)}
            className={styles.bluebox}
            placeholder="Correct answer for Question 1"
            required
          />
        </div>

        {/* Question 2 */}
        <div className={styles["input-container"]}>
          <label htmlFor="question2" className={styles["input-label"]}>
            Question 2:
          </label>
          <input
            type="text"
            name="question2"
            value={question2}
            onChange={(e) => setQuestion2(e.target.value)}
            className={styles.bluebox}
            placeholder="Enter Question 2"
            required
          />
        </div>
        {/* Options for Question 2 */}
        <div className={styles["input-container"]}>
          <label className={styles["input-label"]}>Options for Question 2:</label>
          <input
            type="text"
            name="q2_option1"
            id="2a"
            value={options2.a}
            onChange={(e) => setOptions2({ ...options2, a: e.target.value })}
            className={styles.bluebox}
            placeholder="Option 1 for Question 2"
            required
          />
          <input
            type="text"
            name="q2_option2"
            id="2b"
            value={options2.b}
            onChange={(e) => setOptions2({ ...options2, b: e.target.value })}
            className={styles.bluebox}
            placeholder="Option 2 for Question 2"
            required
          />
          <input
            type="text"
            name="q2_option3"
            id="2c"
            value={options2.c}
            onChange={(e) => setOptions2({ ...options2, c: e.target.value })}
            className={styles.bluebox}
            placeholder="Option 3 for Question 2"
            required
          />
          <input
            type="text"
            name="q2_option4"
            id="2d"
            value={options2.d}
            onChange={(e) => setOptions2({ ...options2, d: e.target.value })}
            className={styles.bluebox}
            placeholder="Option 4 for Question 2"
            required
          />
        </div>
        {/* Correct answer for Question 2 */}
        <div className={styles["input-container"]}>
          <label htmlFor="q2_answer" className={styles["input-label"]}>
            Correct Answer for Question 2:
          </label>
          <input
            type="text"
            name="q2_answer"
            value={answer2}
            id="2"
            onChange={(e) => setAnswer2(e.target.value)}
            className={styles.bluebox}
            placeholder="Correct answer for Question 2"
            required
          />
        </div>

        {/* Question 3 */}
        <div className={styles["input-container"]}>
          <label htmlFor="question3" className={styles["input-label"]}>
            Question 3:
          </label>
          <input
            type="text"
            name="question3"
            value={question3}
            onChange={(e) => setQuestion3(e.target.value)}
            className={styles.bluebox}
            placeholder="Enter Question 3"
            required
          />
        </div>
        {/* Options for Question 3 */}
        <div className={styles["input-container"]}>
          <label className={styles["input-label"]}>Options for Question 3:</label>
          <input
            type="text"
            name="q3_option1"
            id="3a"
            value={options3.a}
            onChange={(e) => setOptions3({ ...options3, a: e.target.value })}
            className={styles.bluebox}
            placeholder="Option 1 for Question 3"
            required
          />
          <input
            type="text"
            name="q3_option2"
            id="3b"
            value={options3.b}
            onChange={(e) => setOptions3({ ...options3, b: e.target.value })}
            className={styles.bluebox}
            placeholder="Option 2 for Question 3"
            required
          />
          <input
            type="text"
            name="q3_option3"
            id="3c"
            value={options3.c}
            onChange={(e) => setOptions3({ ...options3, c: e.target.value })}
            className={styles.bluebox}
            placeholder="Option 3 for Question 3"
            required
          />
          <input
            type="text"
            name="q3_option4"
            id="3d"
            value={options3.d}
            onChange={(e) => setOptions3({ ...options3, d: e.target.value })}
            className={styles.bluebox}
            placeholder="Option 4 for Question 3"
            required
          />
        </div>
        {/* Correct answer for Question 3 */}
        <div className={styles["input-container"]}>
          <label htmlFor="q3_answer" className={styles["input-label"]}>
            Correct Answer for Question 3:
          </label>
          <input
            type="text"
            name="q3_answer"
            value={answer3}
            id="3"
            onChange={(e) => setAnswer3(e.target.value)}
            className={styles.bluebox}
            placeholder="Correct answer for Question 3"
            required
          />
        </div>

        {/* Question 4 */}
        <div className={styles["input-container"]}>
          <label htmlFor="question4" className={styles["input-label"]}>
            Question 4:
          </label>
          <input
            type="text"
            name="question4"
            value={question4}
            onChange={(e) => setQuestion4(e.target.value)}
            className={styles.bluebox}
            placeholder="Enter Question 4"
            required
          />
        </div>
        {/* Options for Question 4 */}
        <div className={styles["input-container"]}>
          <label className={styles["input-label"]}>Options for Question 4:</label>
          <input
            type="text"
            name="q4_option1"
            id="4a"
            value={options4.a}
            onChange={(e) => setOptions4({ ...options4, a: e.target.value })}
            className={styles.bluebox}
            placeholder="Option 1 for Question 4"
            required
          />
          <input
            type="text"
            name="q4_option2"
            id="4b"
            value={options4.b}
            onChange={(e) => setOptions4({ ...options4, b: e.target.value })}
            className={styles.bluebox}
            placeholder="Option 2 for Question 4"
            required
          />
          <input
            type="text"
            name="q4_option3"
            id="4c"
            value={options4.c}
            onChange={(e) => setOptions4({ ...options4, c: e.target.value })}
            className={styles.bluebox}
            placeholder="Option 3 for Question 4"
            required
          />
          <input
            type="text"
            name="q4_option4"
            id="4d"
            value={options4.d}
            onChange={(e) => setOptions4({ ...options4, d: e.target.value })}
            className={styles.bluebox}
            placeholder="Option 4 for Question 4"
            required
          />
        </div>
        {/* Correct answer for Question 4 */}
        <div className={styles["input-container"]}>
          <label htmlFor="q4_answer" className={styles["input-label"]}>
            Correct Answer for Question 4:
          </label>
          <input
            type="text"
            name="q4_answer"
            value={answer4}
            id="4"
            onChange={(e) => setAnswer4(e.target.value)}
            className={styles.bluebox}
            placeholder="Correct answer for Question 4"
            required
          />
        </div>

        {/* Question 5 */}
        <div className={styles["input-container"]}>
          <label htmlFor="question5" className={styles["input-label"]}>
            Question 5:
          </label>
          <input
            type="text"
            name="question5"
            value={question5}
            onChange={(e) => setQuestion5(e.target.value)}
            className={styles.bluebox}
            placeholder="Enter Question 5"
            required
          />
        </div>
        {/* Options for Question 5 */}
        <div className={styles["input-container"]}>
          <label className={styles["input-label"]}>Options for Question 5:</label>
          <input
            type="text"
            name="q5_option1"
            id="5a"
            value={options5.a}
            onChange={(e) => setOptions5({ ...options5, a: e.target.value })}
            className={styles.bluebox}
            placeholder="Option 1 for Question 5"
            required
          />
          <input
            type="text"
            name="q5_option2"
            id="5b"
            value={options5.b}
            onChange={(e) => setOptions5({ ...options5, b: e.target.value })}
            className={styles.bluebox}
            placeholder="Option 2 for Question 5"
            required
          />
          <input
            type="text"
            name="q5_option3"
            id="5c"
            value={options5.c}
            onChange={(e) => setOptions5({ ...options5, c: e.target.value })}
            className={styles.bluebox}
            placeholder="Option 3 for Question 5"
            required
          />
          <input
            type="text"
            name="q5_option4"
            id="5d"
            value={options5.d}
            onChange={(e) => setOptions5({ ...options5, d: e.target.value })}
            className={styles.bluebox}
            placeholder="Option 4 for Question 5"
            required
          />
        </div>
        {/* Correct answer for Question 5 */}
        <div className={styles["input-container"]}>
          <label htmlFor="q5_answer" className={styles["input-label"]}>
            Correct Answer for Question 5:
          </label>
          <input
            type="text"
            name="q5_answer"
            value={answer5}
            id="5"
            onChange={(e) => setAnswer5(e.target.value)}
            className={styles.bluebox}
            placeholder="Correct answer for Question 5"
            required
          />
        </div>

        <button type="submit">{quiz ? "Update" : "Submit"} Quiz</button>
      </form>
    </div>
  );
}

export default QuizForm;
