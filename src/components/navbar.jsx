import React from 'react';
import '../css/navbar.css';

const Navbar = ({ handleSave, handleChangeView }) => {
  return (
    <nav style={{ height: '6vh' }}>
      <h3 className='title'>Web Coder</h3>
      <div className='nav-buttons'>
        <button className='nav-button' onClick={() => handleChangeView()}>
          Change View
        </button>
        <button className='nav-button' onClick={() => handleSave()}>
          Save
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
