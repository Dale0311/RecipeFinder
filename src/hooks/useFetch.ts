import { useEffect, useState } from 'react';
import { TModifiedResponse } from '../types';
import instance from '../api/config';
import axios from 'axios';

type TState = {
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
};

const useFetch = () => {
  const [state, setState] = useState<TState>({
    data: undefined,
    loading: false,
    error: '',
    history: [],
  });

  const [q, setQ] = useState('Filipino');

  useEffect(() => {
    fetchData(q);
  }, [q]);

  const fetchRecipe = (q: string) => setQ(q);

  const fetchData = async (q: string) => {
    setState((p) => ({ ...p, loading: true }));
    try {
      const res = await instance.get<TModifiedResponse>('', {
        params: {
          q,
        },
      });

      const totalPage = res.data.count / 20;
      const currentPage = res.data.to / 20;
      const nextURL = res.data._links.next.href;
      const currentURL = res.request.responseURL;
      const prevURL = '';

      setState((p) => ({
        ...p,
        data: res.data,
        history: [{ totalPage, currentPage, nextURL, currentURL, prevURL }],
      }));
    } catch (error) {
      setState((p) => ({ ...p, error: 'Something went wrong' }));
    } finally {
      setState((p) => ({ ...p, loading: false }));
    }
  };

  // const onPageChange = async (action: 'next' | 'prev') => {
  //   setState((p) => ({ ...p, loading: true }));
  //   try {
  //     const res = await axios.get<TModifiedResponse>(q);
  //     const totalPage = res.data.count / 20;
  //     const currentPage = res.data.to / 20;
  //     const nextURL = res.data._links.next.href;
  //     const currentURL = '';
  //     const prevURL = state.pagination.nextURL;

  //     setState((p) => ({
  //       ...p,
  //       data: res.data,
  //       pagination: { totalPage, currentPage, prevURL, nextURL },
  //     }));
  //   } catch (error) {
  //     setState((p) => ({ ...p, error: 'Something went wrong' }));
  //   } finally {
  //     setState((p) => ({ ...p, loading: false }));
  //   }
  // };

  return { ...state, fetchRecipe };
};

export default useFetch;
