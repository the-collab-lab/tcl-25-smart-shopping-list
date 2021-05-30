import React from 'react';

import { Link } from 'react-router-dom';

import InfoIcon from './InfoIcon';
import Navigation from './Navigation';

const EmptyList = () => (
  <div className="wrapper">
    <div className="dot-shadow panel">
      <main className="list-view flow">
        <div>
          <header className="list-view__header">
            <InfoIcon />
            <h1>To Get Started, Add an Item</h1>
          </header>
        </div>
        <div className="list-view__body">
          <div className="body__inner">
            <div className="btn-container">
              <Link to="/add-view" className="add-button">
                Add Item
              </Link>
            </div>
          </div>
        </div>

        <Navigation />
      </main>
    </div>
  </div>
);

export default EmptyList;
