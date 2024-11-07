import { useContext } from 'react';
import RecipeCard from './RecipeCard';
import { RecipeContext } from '../context';
import Pagination from './Pagination';
import CardSkeleton from './CardSkeleton';

const Recipe = () => {
  const state = useContext(RecipeContext);
  if (!state) {
    return <h1>No context to consume</h1>;
  }

  const { data, error, loading } = state;

  if (loading) {
    return (
      <div className="grid grid-cols-4 gap-4 max-w-full">
        {Array.from({ length: 20 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) return <h1>{error}</h1>;

  const recipeCards = data?.hits.map((recipe, i) => (
    <RecipeCard
      key={i}
      calories={recipe.calories}
      cuisineType={recipe.cuisineType}
      image={recipe.image}
      title={recipe.label}
    />
  ));
  // const recipeCards = data?.hits.map((recipe, i) => (
  //   <RecipeCard
  //     key={i}
  //     calories={recipe.calories}
  //     cuisineType={recipe.cuisineType}
  //     image={recipe.image}
  //     title={recipe.label}
  //   />
  // ));

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 max-w-full">{recipeCards}</div>
      <Pagination />
    </div>
  );
};

export default Recipe;
