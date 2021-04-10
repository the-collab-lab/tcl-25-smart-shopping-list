import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <div className="nav-container">
    <nav>
      <NavLink activeClassName="active" to="/add-view">
        Add Item
      </NavLink>
      <NavLink activeClassName="active" to="/list-view">
        View List
      </NavLink>
    </nav>
  </div>
);

export default Navigation;
