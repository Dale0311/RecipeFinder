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

  useEffect(() => {
    fetchData('Filipino');
  }, []);

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
      const currentURL: string = res.request.responseURL;
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

  // created logic for backtracking
  const onPageChange = async (action: 'next' | 'prev') => {
    setState((p) => ({ ...p, loading: true }));
    const currentHistoryIndex = state.history.length - 1;
    const tempHistory = state.history;

    const nextPageClick = Boolean(action === 'next');

    const currentPagination = state.history[currentHistoryIndex];

    //que
    const q = nextPageClick
      ? currentPagination.nextURL
      : currentPagination.prevURL;

    try {
      const res = await axios.get<TModifiedResponse>(q);

      const newPage = {
        totalPage: res.data.count / 20,
        currentPage: res.data.to / 20,
        nextURL: res.data._links.next.href,
        currentURL: currentPagination.nextURL, //nextURL would be stored in currentURL on next render
        prevURL: currentPagination.currentURL, //currentURL would be store in previousURL when user click next
      };

      nextPageClick ? tempHistory.push(newPage) : tempHistory.pop();
      setState((p) => ({
        ...p,
        data: res.data,
        history: tempHistory,
      }));
    } catch (error) {
      setState((p) => ({ ...p, error: 'Something went wrong' }));
    } finally {
      setState((p) => ({ ...p, loading: false }));
    }
  };

  return { ...state, fetchData, onPageChange };
};

export default useFetch;
