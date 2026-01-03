import { Category } from "@/types";

interface CategoryFilterProps {
     selectedCategory: Category;
     onCategoryChange: (category: Category) => void;
}

const categories: Category[] = ['All', 'Electronics', 'Clothing', 'Shoes'];

export default function CategoryFilter ({selectedCategory, onCategoryChange}:CategoryFilterProps) {
    return(
        <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Filter by Category</h3>
            <div className="flex flex-wrap gap-2">
                {categories.map((category)=> (
                    <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors 
                ${selectedCategory === category
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}>
            {category}
          </button>
                ))}
            </div>
        </div>
    )
}