import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const role = await response.text();
          

        if (role === 'admin') {
          localStorage.setItem('isAdmin', '1');
          setMessage('Connecté en tant qu\'administrateur');
          window.location.href = "/dashboard";
        } else if (role === 'user') {
          localStorage.setItem('isAdmin', '0');
          setMessage('Connecté en tant qu\'utilisateur');
          window.location.href = "/ferme";
         
        } else {
          setMessage('Rôle inconnu');
        }
      } else {
        setMessage('Identifiants invalides');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setMessage('Erreur lors de la connexion');
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
    <div className="card p-5">
      <h2 className="text-center mb-5">Connexion</h2>
      <label>Email:</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control mb-2" />
      <label>Mot de passe:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control mb-2" />
      <button onClick={handleLogin} className="btn btn-primary mb-3">Se connecter</button>
      <p className="text-center">{message}</p>
    </div>
  </div>
  );
};

export default Login;