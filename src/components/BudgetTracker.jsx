import React from 'react';

const BudgetTracker = ({ furniture }) => {
  const totalBudget = furniture.reduce((sum, item) => sum + item.price, 0);
  const itemCount = furniture.length;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Budget Tracker</h3>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Items:</span>
          <span className="font-medium">{itemCount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Budget:</span>
          <span className="font-bold text-indigo-600">${totalBudget.toFixed(2)}</span>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t">
        <h4 className="font-medium mb-2">Breakdown:</h4>
        <div className="space-y-1">
          {furniture.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-600">{item.name}</span>
              <span className="text-gray-800">${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetTracker;