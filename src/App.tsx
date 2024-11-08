import Navbar from './components/Navbar';
import Pagination from './components/Pagination';
import Recipe from './components/Recipe';
import Sidebar from './components/Sidebar';
import { RecipeContext } from './context';
import useFetch from './hooks/useFetch';

// const App = () => {
//   const state = useFetch();
//   return (
//     <div className="h-screen w-screen flex flex-col">
//       <RecipeContext.Provider value={state}>
//         <Navbar />
//         <div className="flex flex-grow overflow-y-auto">
//           <div className="w-1/4 h-full bg-gray-50 text-lg ">
//             <Sidebar />
//           </div>
//           <div className="flex-grow p-4">
//             <Recipe />
//             <Pagination />
//           </div>
//         </div>
//       </RecipeContext.Provider>
//     </div>
//   );
// };
const App = () => {
  const state = useFetch();
  return (
    <div className="h-screen w-screen flex flex-col">
      <RecipeContext.Provider value={state}>
        <Navbar />
        <div className="flex flex-grow overflow-hidden">
          <div className="w-1/4 h-full bg-gray-50 text-lg">
            <Sidebar />
          </div>
          <div className="flex-grow p-4 overflow-y-auto">
            <Recipe />
            <Pagination />
          </div>
        </div>
      </RecipeContext.Provider>
    </div>
  );
};

export default App;
