import React from 'react';
import FurnitureItem from './FurnitureItem';

const items = [
  { id: 1, name: 'Chair', dimensions: [1, 1, 1], price: 199.99 },
  { id: 2, name: 'Table', dimensions: [2, 1, 1.5], price: 499.99 },
  { id: 3, name: 'Sofa', dimensions: [3, 1, 1], price: 899.99 },
  { id: 4, name: 'Bookshelf', dimensions: [1.5, 2, 0.5], price: 299.99 },
];

const FurnitureList = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Available Furniture</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <FurnitureItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default FurnitureList;