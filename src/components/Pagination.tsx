import { useContext } from 'react';
import { RecipeContext } from '../context';

const Pagination = () => {
  const state = useContext(RecipeContext);

  if (!state) {
    return <h1>No context to consume</h1>;
  }

  const { onPageChange, history } = state;

  if (history && history.length < 1) {
    return <></>;
  }

  const currentIndex = history.length - 1;
  const currentHistory = history[currentIndex];

  return (
    <div className="flex items-center space-x-4 mt-4 justify-center">
      {/* Previous Button */}
      <button
        className={`px-4 py-2 rounded border border-gray-300 disabled:cursor-not-allowed `}
        disabled={currentHistory.currentPage === 1 || history.length === 1}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          onPageChange('prev');
        }}
      >
        Previous
      </button>

      {/* Page Number Display */}
      <span className="text-gray-500 text-lg">
        Page {currentHistory?.currentPage} of{' '}
        {Math.ceil(currentHistory?.totalPage)}
      </span>

      {/* Next Button */}
      <button
        className={`px-4 py-2 rounded border border-gray-300 disabled:cursor-not-allowed`}
        onClick={() => {
          onPageChange('next');
        }}
        disabled={currentHistory.currentPage === currentHistory.totalPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
