import { useEffect, useState } from 'react';
import { TModifiedResponse } from '../types';
import instance from '../api/config';

type TCurrentPagination = {
  totalPage: number;
  currentPage: number;
  currentURL: string;
  prevURL: string;
  nextURL: string;
};

type TState = {
  data: TModifiedResponse | undefined;
  loading: boolean;
  error: string;
  history: TCurrentPagination[];
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

  // const fetchData = async (q: string) => {
  const fetchData = async (
    param: string,
    query?: {
      q: string;
      currentPagination: TCurrentPagination;
    }
  ) => {
    setState((p) => ({ ...p, loading: true }));
    const forNewQuery: boolean = Boolean(param) && typeof query === 'undefined';

    try {
      const res = await instance.get<TModifiedResponse>(
        forNewQuery ? '' : query!.q,
        {
          params: forNewQuery
            ? {
                q: param,
              }
            : {},
          // const res = await instance.get<TModifiedResponse>('', {
          //   params: {
          //     q,
          //   },
        }
      );

      // const newPage = {
      //   totalPage: Math.ceil(res.data.count / 20),
      //   currentPage: Math.ceil(res.data.to / 20),
      //   nextURL: res.data._links.next.href,
      //   currentURL: currentPagination.nextURL, //nextURL would be stored in currentURL on next render
      //   prevURL: currentPagination.currentURL, //currentURL would be store in previousURL when user click next
      // };
      const newPage = {
        totalPage: res.data.count / 20,
        currentPage: res.data.to / 20,
        nextURL: res.data._links.next.href,
        currentURL: forNewQuery
          ? (res.request.responseURL as string)
          : query!.currentPagination.nextURL,
        prevURL: forNewQuery ? '' : query!.currentPagination.currentURL,
      };

      const updateHistory = state.history;

      // flawed, because what if i just fetch the next page?
      forNewQuery || query?.q === newPage.currentURL
        ? updateHistory.push(newPage)
        : updateHistory.pop();

      setState((p) => ({
        ...p,
        data: res.data,
        history: updateHistory,
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

    const nextPageClick = Boolean(action === 'next');

    const currentPagination = state.history[currentHistoryIndex];

    //que
    const q = nextPageClick
      ? currentPagination.nextURL
      : currentPagination.prevURL;

    fetchData('', { q, currentPagination });
  };
  // const onPageChange = async (action: 'next' | 'prev') => {
  //   setState((p) => ({ ...p, loading: true }));
  //   const currentHistoryIndex = state.history.length - 1;
  //   const tempHistory = state.history;

  //   const nextPageClick = Boolean(action === 'next');

  //   const currentPagination = state.history[currentHistoryIndex];

  //   //que
  //   const q = nextPageClick
  //     ? currentPagination.nextURL
  //     : currentPagination.prevURL;

  //   try {
  //     const res = await instance.get<TModifiedResponse>(q);

  //     const newPage = {
  //       totalPage: Math.ceil(res.data.count / 20),
  //       currentPage: Math.ceil(res.data.to / 20),
  //       nextURL: res.data._links.next.href,
  //       currentURL: currentPagination.nextURL, //nextURL would be stored in currentURL on next render
  //       prevURL: currentPagination.currentURL, //currentURL would be store in previousURL when user click next
  //     };

  //     nextPageClick ? tempHistory.push(newPage) : tempHistory.pop();
  //     setState((p) => ({
  //       ...p,
  //       data: res.data,
  //       history: tempHistory,
  //     }));
  //   } catch (error) {
  //     setState((p) => ({ ...p, error: 'Something went wrong' }));
  //   } finally {
  //     setState((p) => ({ ...p, loading: false }));
  //   }
  // };

  return { ...state, fetchData, onPageChange };
};

export default useFetch;
