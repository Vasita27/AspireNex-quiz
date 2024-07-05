import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styles from "../styles/login.module.css";

function Login() {
  const history = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    if(!username || !password){
      alert("Please fill in the details")
      return;
    }
    try {
      await axios.post("http://localhost:5000/", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data === "exist") {
          alert("Login Successful");
          history("/home", { state: { id: username } });
        } else if (res.data === "not exist") {
          alert("User not signed in");
        } else if (res.data === "Error occurred establishing the connection") {
          alert("Error occurred establishing the connection");
        }
      })
      .catch((err) => {
        alert("Error occurred");
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.login}>
        <h1 className={styles.header}>Login to QuizMania</h1> 
        <form action="POST">
        <br></br> 
          <div className={styles.formGroup}>
            <label htmlFor="username" style={{ color: "white" }}>Username:</label>
            <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} placeholder="Username" id={styles.username} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" style={{ color: "white" }}>Password:</label>
            <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" id={styles.password} required />
          </div>
          <button type="submit" onClick={submit} style={{ textAlign: "center" }} id="click">Login</button> <br></br> <br></br>
        </form>
        <h4>Didn't signup yet?</h4>
        <Link to="/signup" className={styles.sign}>Signup</Link>
      </div>
    </div>
  );
}

export default Login;
