import { useState, useEffect } from 'react';

type CategorySidebarProps = {
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
};

const categories = ["Category 1", "Category 2", "Category 3"];

export function Sidebar({ selectedCategory, onSelectCategory }: CategorySidebarProps) {
  return (
    <div className="w-1/4 bg-gray-100 p-4 rounded-lg">
      <h2 className="font-bold text-lg mb-4">Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category} className="mb-2">
            <button
              onClick={() => onSelectCategory(category)}
              className={`w-full text-left p-2 rounded-lg ${selectedCategory === category ? "bg-blue-500 text-white" : "bg-white text-black"}`}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
