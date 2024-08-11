import React from 'react';

function Welcome() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome!</h1>
      <p style={styles.message}>You have successfully verified your OTP.</p>
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
  message: {
    fontSize: '1.2em',
    color: '#333',
  },
};

export default Welcome;
