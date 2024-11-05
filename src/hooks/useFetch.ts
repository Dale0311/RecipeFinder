import { useEffect, useState } from 'react';
import { TModifiedResponse } from '../types';
import instance from '../api/config';

type TState = {
  data: TModifiedResponse | undefined;
  loading: boolean;
  error: string;
};

const useFetch = () => {
  const [state, setState] = useState<TState>({
    data: undefined,
    loading: false,
    error: '',
  });

  const [q, setQ] = useState('Filipino');

  useEffect(() => {
    fetchData(q);
  }, [q]);

  const fetchRecipe = (q: string) => setQ(q);

  const fetchData = async (q: string) => {
    setState((p) => ({ ...p, loading: true }));
    try {
      const res = await instance.get('', {
        params: {
          q,
        },
      });
      setState((p) => ({ ...p, data: res.data }));
    } catch (error) {
      setState((p) => ({ ...p, error: 'Something went wrong' }));
    } finally {
      setState((p) => ({ ...p, loading: false }));
    }
  };

  return { ...state, fetchRecipe };
};

export default useFetch;
