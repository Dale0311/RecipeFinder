import axios from 'axios';
import { TModifiedResponse, TApiResponse } from '../types';

const instance = axios.create({
  baseURL: 'https://api.edamam.com/api/recipes/v2',
  params: {
    app_key: import.meta.env.VITE_APPKEY,
    app_id: import.meta.env.VITE_APPID,
    type: 'public',
  },
});

const transformData = (data: TApiResponse): TModifiedResponse => {
  const hits = data.hits.map((hit) => ({
    image: hit.recipe.image,
    label: hit.recipe.label,
    cuisineType: hit.recipe.cuisineType,
    calories: hit.recipe.calories,
  }));
  return { hits, _links: data._links, count: data.count, to: data.to };
};

instance.interceptors.response.use(
  (response) => {
    if (
      typeof response.data === 'object' &&
      response.data !== null &&
      'hits' in response.data
    ) {
      response.data = transformData(response.data as TApiResponse);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
