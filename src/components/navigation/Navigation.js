import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <div className="nav-container">
    <div className="nav-container__inner">
      <div className="flow-space-700">
        <nav>
          <ul className="nav">
            <NavLink
              activeClassName="active"
              to="/add-view"
              className="nav__link"
            >
              Add Item
            </NavLink>
            <NavLink
              activeClassName="active"
              to="/list-view"
              className="nav__link"
            >
              View List
            </NavLink>
          </ul>
        </nav>
      </div>
    </div>
  </div>
);

export default Navigation;
