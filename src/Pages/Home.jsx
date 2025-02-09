import React from 'react';
import Sidebar from '../components/Sidebar';
import RoomCanvas from '../components/RoomCanvas';

const Home = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <RoomCanvas />
    </div>
  );
};

export default Home;
