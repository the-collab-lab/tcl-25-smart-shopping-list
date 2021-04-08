import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav>
      <NavLink activeClassName="active" to="/add-view">
        Add Item
      </NavLink>
      <NavLink activeClassName="active" to="/list-view">
        View List
      </NavLink>
    </nav>
  );
};

export default Navigation;
