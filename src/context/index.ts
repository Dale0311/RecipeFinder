import { createContext } from 'react';
import { TModifiedResponse } from '../types';

type TContext = {
  data: TModifiedResponse | undefined;
  loading: boolean;
  error: string;
  history: {
    totalPage: number;
    currentPage: number;
    currentURL: string;
    prevURL: string;
    nextURL: string;
  }[];
  fetchData: (q: string) => void;
  onPageChange: (action: 'next' | 'prev') => void;
};

export const RecipeContext = createContext<TContext | null>(null);
