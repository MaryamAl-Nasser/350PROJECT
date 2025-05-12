// app/login/page.js
'use client';

import { useEffect, useState } from 'react';
import styles from './login.module.css'
export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const responseData = await response.json();

      if (responseData.id === 0) {
        setError(responseData.username);
        return;
      } else {
        localStorage.setItem("logginName", responseData.username);
        window.location.href = '/instructor'
      };
    } catch (err) {
      setError(err.message);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.removeItem("logginName");
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <img src="/qulogo.png" alt="Logo" className={styles.logo} />
        <h1 className={styles.title}>Login</h1>
        
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            /><label>hint:admin</label>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
             <label>hint: PPaa@123</label>
          </div>
         
         

          <button 
            type="submit" 
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}