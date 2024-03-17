import React, { useState } from 'react';
import { signUp, logIn } from './auth';

const LoginSignUpComponent = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        signUp(username, password);
      } else {
        logIn(username, password);
      }
      onLogin();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <header style={{ padding: "0", textAlign: "center", backgroundColor: "#2c3e50", color: "white" }}>
        <h2 style={{ float: "left", padding: "1rem", fontStyle: "bold" }}>Global Population Tracker</h2>
    </header>
    <main style={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'top', alignItems: 'center' }}>
    <div style={{ fontSize: '30px', paddingTop: '30px'}}>Welcome to the Global Population Tracker</div>
    <div style={{ fontSize: '20px', paddingTop: '10px'}}>Please login or create an account to explore the Dashboard</div>
        <div style={{ width: '100%', maxWidth: '400px', textAlign: 'center', paddingTop: '100px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <div
                    onClick={() => setIsSignUp(false)}
                    style={{
                    padding: '10px 30px',
                    cursor: 'pointer',
                    borderBottom: !isSignUp ? '3px solid white' : 'none',
                    color: !isSignUp ? 'white' : '#2c3e50',
                    }}
                >
                    Login
                </div>
                <div
                    onClick={() => setIsSignUp(true)}
                    style={{
                    padding: '10px 30px',
                    cursor: 'pointer',
                    borderBottom: isSignUp ? '3px solid white' : 'none',
                    color: isSignUp ? 'white' : '#2c3e50',
                    }}
                >
                    Sign Up
                </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="  Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="  Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            
                <button type="submit">{isSignUp ? 'Create Account' : 'Log In'}</button>
            </form>
        </div>
    </main>

    <footer style={{ padding: "0", textAlign: "center", backgroundColor: "#2c3e50", color: "white" }}>
        <p style={{ margin: "0", padding: "1rem" }}>2024</p>
    </footer>
  </div>
    
  );
};

export default LoginSignUpComponent;
