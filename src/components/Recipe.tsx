import { useContext } from 'react';
import RecipeCard from './RecipeCard';
import { RecipeContext } from '../context';

const Recipe = () => {
  const state = useContext(RecipeContext);

  if (!state) {
    return <h1>No context to consume</h1>;
  }

  const { data, error, loading } = state;

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) return <h1>{error}</h1>;

  const recipeCards = data?.hits.map((recipe) => (
    <RecipeCard
      key={recipe.label}
      calories={recipe.calories}
      cuisineType={recipe.cuisineType}
      image={recipe.image}
      title={recipe.label}
    />
  ));

  return <div className="grid grid-cols-4 gap-4 max-w-full">{recipeCards}</div>;
};

export default Recipe;
