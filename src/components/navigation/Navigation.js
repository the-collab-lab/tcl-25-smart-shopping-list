import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <div className="nav-container">
    <div className="nav-container__inner">
      <div className="flow-space-700">
        <nav>
          <ul className="nav">
            <li>
              <NavLink
                activeClassName="active"
                to="/add-view"
                className="nav__link"
              >
                Add Item
              </NavLink>
            </li>
            <li>
              <NavLink
                activeClassName="active"
                to="/list-view"
                className="nav__link"
              >
                View List
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
);

export default Navigation;
