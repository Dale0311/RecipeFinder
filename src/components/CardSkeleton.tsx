const CardSkeleton = () => {
  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image */}
      <div className="w-full h-48 bg-gray-200"></div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>

        {/* Cuisine and Calories */}
        <div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>

        {/* Button */}
        <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
