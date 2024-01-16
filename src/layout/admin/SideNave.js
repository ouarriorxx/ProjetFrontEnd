import React from 'react'
import { Link } from 'react-router-dom'

export default function SideNave() {
  return (
    <div > {/* Main Sidebar Container */}
<aside className="main-sidebar sidebar-dark-primary elevation-4">
  {/* Brand Logo */}
  <a href="index3.html" className="brand-link">
    <img src="assets/images/logo irisi.jpg" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
    <span className="brand-text font-weight-light"> irisiChatbot</span>
  </a>
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      
      <div className="info">
        <a href="#" className="d-block">hello </a>
      </div>
    </div>

    {/* Sidebar Menu */}
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        {/* Add icons to the links using the .nav-icon class
           with font-awesome or any other icon font library */}
        <li >
          <a href="#" className="nav-link ">
            <i className="nav-icon fas fa-tachometer-alt" />
            <p>
              <Link to='/dashboard'>Dashboard</Link>
              
              
              <i className="right fas fa-angle-left" />
            </p>
          </a>
          
        </li>
        <li className="nav-item menu-open">
          <a href="#" className="nav-link active">
            <i className="nav-icon fas fa-tachometer-alt" />
            <p>
              <Link to='/ferme'>ferme</Link>
              
              
              <i className="right fas fa-angle-left" />
            </p>
          </a>
          
        </li>
        <li >
          <a href="#" className="nav-link ">
            <i className="nav-icon fas fa-tachometer-alt" />
            <p>
              <Link to='/user'>User</Link>
              
              
              <i className="right fas fa-angle-left" />
            </p>
          </a>
          
        </li>
        <li >
          <a href="#" className="nav-link ">
            <i className="nav-icon fas fa-tachometer-alt" />
            <p>
              <Link to='/parcelle'>parcelle</Link>
              
              
              <i className="right fas fa-angle-left" />
            </p>
          </a>
          
        </li>
        <li >
          <a href="#" className="nav-link ">
            <i className="nav-icon fas fa-tachometer-alt" />
            <p>
              <Link to='/plante'>plante</Link>
              
              
              <i className="right fas fa-angle-left" />
            </p>
          </a>
          
        </li>
        <li >
          <a href="#" className="nav-link ">
            <i className="nav-icon fas fa-tachometer-alt" />
            <p>
              <Link to='/plantage'>Plantage</Link>
              
              
              <i className="right fas fa-angle-left" />
            </p>
          </a>
          
        </li>
        <li >
          <a href="#" className="nav-link ">
            <i className="nav-icon fas fa-tachometer-alt" />
            <p>
              <Link to='/type_plante'>type plante</Link>
              
              
              <i className="right fas fa-angle-left" />
            </p>
          </a>
          
        </li>
      
      </ul>
    </nav>
  </div>
</aside>
</div>
  )
}
