import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import LandingPage from './Pages/LandingPage';
import RoomCanvas from './components/RoomCanvas';
import FengShuiPage from './feng-shui';

const App = () => {
  return (
    <Router>
      <DndProvider backend={HTML5Backend}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/room-planner" element={<RoomCanvas />} />
          <Route path="/feng-shui" element={<FengShuiPage />} />
        </Routes>
      </DndProvider>
    </Router>
  );
};

export default App;
