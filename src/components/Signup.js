import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styles from "../styles/signup.module.css";

function Signup() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/signup", {
        email: email,
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data === "exist") {
          alert("User already exists. Username and email both should be unique");
        } else if (res.data === "not exist") {
          history("/home", { state: { id: username } });
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Wrong details");
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signup}>
        <h1>Signup</h1>
        <form onSubmit={submit}>
          <br></br>
          <div className={styles.formGroup}>
            <label htmlFor="email" style={{ color: "white" }}>Your Email:</label>
            <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" id={styles.email} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="username" style={{ color: "white" }}>Username:</label>
            <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} placeholder="Username" id={styles.username} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" style={{ color: "white" }}>Password:</label>
            <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" id={styles.password} required />
          </div>
          <button type="submit">Signup</button>
          <br></br>
        </form>
        <div>
        <br></br>
        <h4>Already have an account?</h4>
        <Link to="/" className={styles.sign}>Click to Login</Link></div>
      </div>
    </div>
  );
}

export default Signup;
