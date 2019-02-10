import React from 'react';
import './SideNav.css'
import { Link } from 'react-router-dom'

function SideNav() {
    return (
    <div className="bg-light border-right" id="sidebar-wrapper">
      <div className="sidebar-heading">Start Bootstrap </div>
      <div className="list-group list-group-flush">
        <Link to="/" className="list-group-item list-group-item-action bg-light">Campaigns</Link>
        <Link to="/emailList" className="list-group-item list-group-item-action bg-light">Email List</Link>
        <Link to="/airlineSettings" className="list-group-item list-group-item-action bg-light">Airline Settings</Link>
        <a href="#" className="list-group-item list-group-item-action bg-light">Profile</a>
        <a href="#" className="list-group-item list-group-item-action bg-light">Status</a>
      </div>
    </div>
    );
}

export default SideNav