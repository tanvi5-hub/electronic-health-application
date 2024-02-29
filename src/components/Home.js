import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const navigate = useNavigate();

    function handleSignIn() {
        navigate('/signIn');
    }

    function handleSignUp() {
        navigate('/signUp');
    }

    return (
        <div className="home-container">
          <header>
            <h1>Electronic Health Web Application</h1>
          </header>
          <body>
            <div className="button-container">
              <button className="sign-in-button" onClick={handleSignIn}>Sign In</button>
              <button className="sign-up-button" onClick={handleSignUp}>Sign Up</button>
            </div>
          </body>
          <footer>
            <p>© 2024 Electronic Health Application. All rights reserved.</p>
          </footer>
        </div>
    );
}

export default Home;