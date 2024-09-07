import React from "react";

interface CategoriesBarProps {
  categories: { id: string; name: string }[];
  onSelectCategory: (categoryId: string) => void;
  selectedCategory: string | undefined;
}

const CategoriesBar: React.FC<CategoriesBarProps> = ({
  categories,
  onSelectCategory,
  selectedCategory,
}) => {
  return (
    <div>
      {categories.map((category) => (
        <button
          key={category.id}
          className={`block w-full text-left px-4 py-2 ${
            selectedCategory === category.id ? "bg-gray-200" : ""
          }`}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoriesBar;
