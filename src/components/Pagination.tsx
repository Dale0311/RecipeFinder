import { useContext } from 'react';
import { RecipeContext } from '../context';

const Pagination = () => {
  const state = useContext(RecipeContext);

  if (!state) {
    return <h1>No context to consume</h1>;
  }

  const { onPageChange } = state;
  return (
    <div className="flex items-center space-x-4 mt-4 justify-center">
      {/* Previous Button */}
      <button
        className={`px-4 py-2 rounded border border-gray-300 `}
        onClick={() => onPageChange('prev')}
      >
        Previous
      </button>

      {/* Page Number Display */}
      <span className="text-gray-500 text-lg">Page 1 of 19</span>

      {/* Next Button */}
      <button
        className={`px-4 py-2 rounded border border-gray-300`}
        onClick={() => onPageChange('next')}
      >
        Next
      </button>
    </div>
  );
};
// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   return (
//     <div className="flex items-center space-x-4 mt-4 justify-center">
//       {/* Previous Button */}
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className={`px-4 py-2 rounded border border-gray-300 ${
//           currentPage === 1
//             ? 'text-gray-400 cursor-not-allowed'
//             : 'hover:bg-gray-100 text-gray-600'
//         }`}
//       >
//         Previous
//       </button>

//       {/* Page Number Display */}
//       <span className="text-gray-500 text-lg">
//         Page {currentPage} of {totalPages}
//       </span>

//       {/* Next Button */}
//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className={`px-4 py-2 rounded border border-gray-300 ${
//           currentPage === totalPages
//             ? 'text-gray-400 cursor-not-allowed'
//             : 'hover:bg-gray-100 text-gray-600'
//         }`}
//       >
//         Next
//       </button>
//     </div>
//   );
// };

export default Pagination;
