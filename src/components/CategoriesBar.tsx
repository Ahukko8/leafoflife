// import React from "react";

// interface Category {
//   id: string;
//   name: string;
// }

// interface CategoriesBarProps {
//   categories: Category[];
//   onSelectCategory: (categoryId: string) => void;
//   selectedCategory: string | undefined;
// }

// const CategoriesBar: React.FC<CategoriesBarProps> = ({
//   categories,
//   onSelectCategory,
//   selectedCategory,
// }) => {
//   return (
//     <div>
//       {categories.map((category) => (
//         <button
//           key={category.id}
//           className={`mt-2 block w-full mb-1 px-4 py-2 bg-gray-200 text-black rounded-sm hover:bg-slate-400/80 text-center ${
//             selectedCategory === category.id ? " bg-slate-400" : ""
//          }`}
//           onClick={() => onSelectCategory(category.id)}
//         >
//           {category.name}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default CategoriesBar;

import React from "react";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
}

interface CategoriesBarProps {
  categories: Category[];
  onSelectCategory: (categoryId: string | null) => void;
  selectedCategory: string | null;
}

const CategoriesBar: React.FC<CategoriesBarProps> = ({
  categories,
  onSelectCategory,
  selectedCategory,
}) => {
  return (
    <div>
      {categories.map((category) => (
        <Button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`mt-2 block w-full mb-1 px-4 py-2 bg-gray-200 text-black rounded-sm hover:bg-slate-400/80 text-center ${
            selectedCategory === category.id ? " bg-slate-400" : ""
          }`}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoriesBar;
