import { createContext } from 'react';
import { TModifiedResponse, TRecipe } from '../types';

type TContext = {
  data: TModifiedResponse | undefined;
  loading: boolean;
  error: string;
  fetchRecipe: (q: string) => void;
};

export const RecipeContext = createContext<TContext | null>(null);
