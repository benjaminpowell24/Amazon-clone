import React, {useState} from "react";
import './Login.css';
import {auth} from "./firebase";
import {Link, useHistory} from "react-router-dom";

function Login(){
    const history = useHistory();
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();
        auth
            .signInWithEmailAndPassword(email, password)
            .then((auth) => {  
                history.push("/")
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
                    <h1>Sign In</h1>
                    <form>
                        <div>
                            <h5>Email</h5>
                            <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                        </div>
                        <div>
                        <h5>Password</h5>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                        </div>
                            <button className="login__signInButton" type="submit" onClick={signIn}>Sign In</button>
                    </form>
                    <small>
                        By continuing you agree to FAKE AMAZON conditions of use and privacy terms
                    </small>
                </div>
                <small className="login__smallText">Not a member already?</small>
                
                <Link to="/signUp">
                    <button className="login__registerButton">Create your Amazon account</button>
                </Link>
                <small className="login__smallText">Forgot password? Reset</small>
            </div>
        </div>    
    );
}

export default Login;