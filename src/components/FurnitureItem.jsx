import React from 'react';
import { useDrag } from 'react-dnd';

const FurnitureItem = ({ item }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'furniture',
    item: {
      id: item.id,
      name: item.name,
      dimensions: item.dimensions,
      price: item.price,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-4 bg-gray-50 rounded-md cursor-move border border-gray-200 hover:bg-gray-100 transition-colors ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <div className="font-medium text-gray-800">{item.name}</div>
      <div className="text-sm text-gray-500">
        {item.dimensions.join(' × ')} meters
      </div>
      <div className="text-sm font-semibold text-indigo-600">
        ${item.price.toFixed(2)}
      </div>
    </div>
  );
};

export default FurnitureItem;