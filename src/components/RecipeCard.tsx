import { useState } from 'react';

type RecipeCardProps = {
  image: string;
  title: string;
  cuisineType: string[];
  calories: number;
};

const RecipeCard = ({
  image,
  title,
  cuisineType,
  calories,
}: RecipeCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      {/* Image */}
      <img
        src={image}
        className={`w-full h-48 object-cover ${
          isLoaded ? 'block' : 'animate-pulse bg-gray-100'
        }`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>

        {/* Cuisine and Calories */}
        <div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
          <span>{cuisineType.join(' • ')}</span>
          <span className="text-sm">{calories.toFixed()} Cal</span>
        </div>

        {/* Button */}
        <button className="w-full mt-4 py-2 text-center text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors duration-200">
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
