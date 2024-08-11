import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [stage, setStage] = useState('request'); // 'request' or 'verify'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/send-otp', { email });
      setStage('verify');
      setMessage('OTP sent to your email');
    } catch (error) {
      setMessage('Error sending OTP');
    }
  };

  const handleOtpSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/verify-otp', { email, otp });
      setMessage('OTP verified. Redirecting...');
      navigate('/welcome');
    } catch (error) {
      setMessage('Invalid OTP');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>OTP Verification</h1>
      {stage === 'request' && (
        <div style={styles.formContainer}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleEmailSubmit} style={styles.button}>Submit</button>
        </div>
      )}

      {stage === 'verify' && (
        <div style={styles.formContainer}>
          <label style={styles.label}>Enter OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleOtpSubmit} style={styles.button}>Submit</button>
        </div>
      )}

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '2em',
    marginBottom: '20px',
    color: '#333',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  label: {
    marginBottom: '10px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  button: {
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  message: {
    marginTop: '20px',
    color: '#d9534f',
  },
};

export default Home;
