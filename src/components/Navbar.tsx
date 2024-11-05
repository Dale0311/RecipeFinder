import { useContext, useState } from 'react';
import {
  RiSettings3Line,
  RiNotification2Line,
  RiSearch2Line,
} from 'react-icons/ri';
import { RecipeContext } from '../context';

const Navbar = () => {
  const [q, setQ] = useState('');
  const state = useContext(RecipeContext);

  if (!state) {
    return <h1>No context to consume</h1>;
  }

  const { fetchRecipe } = state;
  const isDisable = Boolean(!q);

  const handleSearch = () => {
    fetchRecipe(q);
  };

  return (
    <div className="p-4 flex justify-between border-b">
      <div className="flex items-center">
        <img src="img/icon.svg" className="h-12 w-12" />
        <div className="leading-4">
          <h1 className="text-xl font-bold">
            Me<span className="text-red-500">@Cooking</span>
          </h1>
          <p className="text-gray-500 text-sm">Best meal suggestion</p>
        </div>
      </div>
      <div className="flex w-1/4 items-center space-x-1">
        <div className="flex relative items-center flex-1 rounded-md p-1 border">
          <RiSearch2Line className="absolute left-2 text-xl" />
          <input
            type="text"
            placeholder="Find recipe"
            className="pl-8 py-1 focus:outline-none w-full"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <button
          className="p-2 rounded-md bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-300 hover:bg-blue-600 text-white"
          disabled={isDisable}
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="flex text-2xl items-center space-x-1">
        <div className="flex items-center">
          <RiSettings3Line />
          <RiNotification2Line />
        </div>
        <span className="text-gray-300"> | </span>
        <img
          src="https://images8.alphacoders.com/134/1348853.png"
          alt=""
          className="h-8 w-8 rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;
