import { useContext } from 'react';
import RecipeCard from './RecipeCard';
import { RecipeContext } from '../context';
import Pagination from './Pagination';

const Recipe = () => {
  const state = useContext(RecipeContext);

  if (!state) {
    return <h1>No context to consume</h1>;
  }

  const { data, error, loading, history } = state;

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) return <h1>{error}</h1>;
  console.log('_______________________________________');
  console.log('Data');
  console.log(data);
  console.log('   ');
  console.log('_______________________________________');
  console.log('history');
  console.log(history);
  console.log('   ');
  console.log('_______________________________________');

  const recipeCards = data?.hits.map((recipe, i) => (
    <RecipeCard
      key={recipe.label + i}
      calories={recipe.calories}
      cuisineType={recipe.cuisineType}
      image={recipe.image}
      title={recipe.label}
    />
  ));

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 max-w-full">{recipeCards}</div>
      <Pagination />
    </div>
  );
};

export default Recipe;
