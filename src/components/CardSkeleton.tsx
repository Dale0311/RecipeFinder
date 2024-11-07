const CardSkeleton = () => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 animate-pulse bg-white">
      {/* Image Placeholder */}
      <div className="h-40 bg-gray-300 rounded mb-4"></div>

      {/* Title Placeholder */}
      <div className="h-6 bg-gray-300 rounded mb-2 w-3/4"></div>

      {/* Subtitle Placeholder (for category and calories) */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>

      {/* Button Placeholder */}
      <div className="h-10 bg-gray-300 rounded w-full"></div>
    </div>
  );
};

export default CardSkeleton;
