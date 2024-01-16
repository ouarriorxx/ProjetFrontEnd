// src/App.js
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Service from './page/Service';
import About from './page/About_page';
import Home from './page/Home_page';
import Contact from './page/Contact_page';

import Login from './page/Login_User';
import Errore from './page/Error_page';
import Register from './page/Registre_User';
import Dashboard from './components/admin/Dashboard';
import Farms from './components/admin/ferme/FermeList';
import Userse from './components/admin/user/UserList';
import Parcelles from './components/admin/parcelle/ParcelleList';
import Plantes from './components/admin/plante/PlanteList';
import TypePlantes from './components/admin/type_plante/Type_plante';
import Plantages from './components/admin/Plantage/PlantageList';

function App() {
  const isAdmin = localStorage.getItem('isAdmin') === '1';

  return (
    <Router>

      <div className="App">
     
     
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/service" element={<Service/>} />
          <Route path="/contact" element={<Contact/>} />
          
          <Route path="/login" element={<Login/>} />
          <Route path="/registre" element={<Register/>} />
          <Route path="*" element={<Errore/>} />
           { isAdmin && (
            <>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/user" element={<Userse/>} />
          </>
           )
           }
          

          <Route path="/ferme" element={<Farms/>} />

         

          <Route path="/parcelle" element={<Parcelles/>} />
          <Route path="/plante" element={<Plantes/>} />
          <Route path="/type_plante" element={<TypePlantes/>} />
          <Route path="/plantage" element={<Plantages/>} />



        </Routes>
      </div>
    </Router>
  );
}
export default App;