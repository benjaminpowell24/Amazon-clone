import React, {useState} from "react";
import "./Login.css";
import firebase from "firebase";
import {auth} from "./firebase";
import {Link, useHistory} from "react-router-dom";

function Register(){
    const history = useHistory();
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[firstName, setFname] = useState('');
    const[lastName, setLname] = useState('');

    const register = e => {
        e.preventDefault();
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                    const newUser = firebase.auth().currentUser;
                    if(auth){
                        history.push('/')
                    }
                    return newUser.updateProfile({
                        displayName: firstName
                    })
            })
            .catch(error => alert(error.message))
        
    }

    return(
        <div className="login">
            <Link to="/">
                <img className="login__img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"/>
            </Link>
            <div className="login__container">
                <div className="login__containerInner">
                    <h1>Sign Up</h1>
                    <form>
                        <div>
                            <h5>First Name</h5>
                            <input type="text" value={firstName} onChange={e => setFname(e.target.value)}/>
                        </div>
                        <div>
                            <h5>Last Name</h5>
                            <input type="text" value={lastName} onChange={e => setLname(e.target.value)}/>
                        </div>
                        <div>
                            <h5>Email</h5>
                            <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div>
                        <h5>Password</h5>
                            <input type="password" placeholder="At least 6 characters" value={password} onChange={e => setPassword(e.target.value)}/>
                        </div>
                            <button className="login__signInButton" type="submit" onClick={register}>Create your Amazon account</button>
                    </form>
                    <small>
                        By continuing you agree to FAKE AMAZON conditions of use and privacy terms
                    </small>
                </div>
                <small className="login__smallText">Already have an account?</small>
                
                <Link to="/Login">
                    <button className="login__registerButton">Sign In</button>
                </Link>
            </div>
        </div>    
    );
}

export default Register;