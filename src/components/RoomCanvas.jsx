import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Plane } from '@react-three/drei';
import { useDrop } from 'react-dnd';
import { SketchPicker } from 'react-color';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import FurnitureList from './FurnitureList';
import BudgetTracker from './BudgetTracker';
import SidebarChatbot from '../Pages/SiderChatbot';

const RoomCanvas = () => {
  const navigate = useNavigate();
  const [furniture, setFurniture] = useState([]);
  const [wallColor, setWallColor] = useState('#b0b0b0');
  const [furnitureColor, setFurnitureColor] = useState('#8f8f8f');
  const [hoveredFurniture, setHoveredFurniture] = useState(null);

  const [, drop] = useDrop(() => ({
    accept: 'furniture',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const canvasBounds = document
        .querySelector('canvas')
        .getBoundingClientRect();

      // Calculate relative position in canvas
      const x = ((offset.x - canvasBounds.left) / canvasBounds.width) * 10 - 5;
      const z = ((offset.y - canvasBounds.top) / canvasBounds.height) * 10 - 5;

      setFurniture((prevFurniture) => [
        ...prevFurniture,
        {
          id: `${item.id}-${Date.now()}`,
          name: item.name,
          position: [x, item.dimensions[1] / 2, z],
          dimensions: item.dimensions,
          price: item.price,
          sustainability:
            Math.random() > 0.5 ? 'Eco-friendly' : 'Non-sustainable',
        },
      ]);
    },
  }));

  const handleHoverStart = (item) => {
    setHoveredFurniture(item);
  };

  const handleHoverEnd = () => {
    setHoveredFurniture(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg mb-4">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Room Planner</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-4rem)]">
        <div className="w-80 bg-white p-6 shadow-lg space-y-6 overflow-y-auto">
          <h2 className="text-xl font-bold text-gray-800">Room Customizer</h2>

          <FurnitureList />

          <BudgetTracker furniture={furniture} />

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Wall Color
            </h3>
            <SketchPicker
              color={wallColor}
              onChangeComplete={(color) => setWallColor(color.hex)}
              className="w-full"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Furniture Color
            </h3>
            <SketchPicker
              color={furnitureColor}
              onChangeComplete={(color) => setFurnitureColor(color.hex)}
              className="w-full"
            />
          </div>
        </div>

        <div ref={drop} className="flex-1 relative">
          <Canvas camera={{ position: [5, 5, 10] }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

            <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="lightgray" side={THREE.DoubleSide} />
            </Plane>

            <Box args={[10, 5, 0.1]} position={[0, 2.5, -5]}>
              <meshStandardMaterial color={wallColor} />
            </Box>
            <Box args={[0.1, 5, 10]} position={[-5, 2.5, 0]}>
              <meshStandardMaterial color={wallColor} />
            </Box>
            <Box args={[0.1, 5, 10]} position={[5, 2.5, 0]}>
              <meshStandardMaterial color={wallColor} />
            </Box>

            {furniture.map((item) => (
              <Box
                key={item.id}
                args={item.dimensions}
                position={item.position}
                onPointerOver={() => handleHoverStart(item)}
                onPointerOut={handleHoverEnd}
              >
                <meshStandardMaterial color={furnitureColor} />
              </Box>
            ))}

            <OrbitControls />
          </Canvas>

          {hoveredFurniture && (
            <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-2">
                {hoveredFurniture.name}
              </h3>
              <p className="mb-1">
                Dimensions: {hoveredFurniture.dimensions.join(' × ')} meters
              </p>
              <p className="mb-1">
                Price: ${hoveredFurniture.price.toFixed(2)}
              </p>
              <p>Sustainability: {hoveredFurniture.sustainability}</p>
            </div>
          )}
        </div>
      </div>

      <SidebarChatbot />
    </div>
  );
};

export default RoomCanvas;
