import React from 'react';
import { FiLogOut } from 'react-icons/fi';

import './pages/admin.css';

const NavBar = () => (
  <div className="Navbar-container">
    <p>logo</p>
    <div className="logoutIcon">
      <FiLogOut />
    </div>
  </div>
);

const Panel = () => (
  <div>
    <div className="Panel-componant">Userlist</div>
    <div className="Panel-page">
      <div className="row">
        <div className="block">username</div>
        <div className="block">userID</div>
        <div className="block">Resgister Date</div>
        <div className="block">Delete</div>
      </div>
    </div>
  </div>
);

const Admin = () => (
  <div className="admin-container">
    <NavBar />
    <div className="Panel-container">
      <Panel />
    </div>
  </div>
);

export default Admin;
