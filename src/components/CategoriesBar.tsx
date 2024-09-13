// import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <Select
      value={selectedCategory || "all"}
      onValueChange={(value) => onSelectCategory(value === "all" ? null : value)}
      
    >
      <SelectTrigger className="w-full md:w-[200px] text-zinc-900">
        <SelectValue placeholder="Select Category" className="text-zinc-900"/>
      </SelectTrigger>
      <SelectContent className="text-zinc-900">
        <SelectItem value="all" className="text-zinc-900">All Categories</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.id} className="text-zinc-900">
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoriesBar;