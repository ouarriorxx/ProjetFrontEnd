import React, { useState } from 'react';

const Register = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const formData = new FormData();
      formData.append('nom', nom);
      formData.append('prenom', prenom);
      formData.append('role', 0);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('image', image);

      const response = await fetch('http://localhost:8081/api/users/createUser', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        localStorage.setItem('isAdmin', '0');
        setMessage('Inscription réussie');
        window.location.href = "/ferme";
       
      } else {
        setMessage('Erreur lors de l\'inscription');
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      setMessage('Erreur lors de l\'inscription');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6">
          <div className="card p-4">
            <h2 className="text-center mb-4">Inscription</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="nom" className="form-label">Nom:</label>
                <input type="text" id="nom" className="form-control" value={nom} onChange={(e) => setNom(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="prenom" className="form-label">Prénom:</label>
                <input type="text" id="prenom" className="form-control" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">Rôle:</label>
                <input type="text" id="role" className="form-control" value={role} onChange={(e) => setRole(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="text" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Mot de passe:</label>
                <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">Image:</label>
                <input type="file" id="image" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
              </div>
              <button type="button" onClick={handleRegister} className="btn btn-primary mb-3">S'inscrire</button>
              <p className="text-center">{message}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
