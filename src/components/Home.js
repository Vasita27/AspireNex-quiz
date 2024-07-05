import React from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
import styles from "../styles/home.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
function Home(){
    const history=useNavigate();
    const location = useLocation();
    const a =location.state.id;
    const gmailAddress = "mailto:vasita.puppala@gmail.com";
    return(
        <div className={styles.homeContainer}>
        <div className={styles.head}>
            <div className={styles.paracontent}>
            <p className={styles.para}>Welcome {location.state.id}! This is a mini quiz website where you can create quizzes , play quizzes created by others , edit and delete your quizzes. Please make use of the below buttons to navigate through our website and access functionalities you would like to</p></div>
        </div>
        <div className="Homepage">
            <div className={styles.buttonContainer}>
            <button className={styles.hb} onClick={()=>history("/addquiz",{state:{id:a}})}>Go to Add quiz</button> <br></br>
            <button className={styles.hb} onClick={()=>history("/getquiz",{state:{id:a}})}>Play quiz</button> <br></br>
            <button  className={styles.hb} onClick={()=>history("/quizzes",{state:{id:a}})}>Get quiz names</button> <br></br>
            <button className={styles.hb} onClick={()=>history("/deletequiz",{state:{id:a}})}>Delete/Edit your quizzes</button> <br></br>
        </div></div>
        <div className="container fadeInEffect" style={{textAlign:"center"}}>
            <h1>Contact <span style={{color:"blue"}}>Us</span></h1>
           <p className={styles.container}> If you have any queries or suggestions, please feel free to contact us
        by clicking the link below. <br></br>We value your feedback and are committed
        to providing you with the best service possible. Our team is here to <br></br>
        assist you with any questions you may have about our products or
        services. <br></br>Don't hesitate to reach out to us - we're always happy to
        help!</p>
            <div>
      <a href={gmailAddress} target="_blank" rel="noopener noreferrer">
       Mail Us
      </a>
    </div>
        </div>
        </div>
    );
}

export default Home;