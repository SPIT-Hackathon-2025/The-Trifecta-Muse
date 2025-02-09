import React from 'react';
import FurnitureList from './FurnitureList';

const Sidebar = () => {
  return (
    <div style={{ width: '250px', padding: '10px', background: '#f4f4f4' }}>
      <h3>Furniture</h3>
      <FurnitureList />
    </div>
  );
};

export default Sidebar;
