import { CREATE, RECIPE } from '../constants/routeNames';
import apiClient from '../services/apiClient';

export const fetchUserRecipes = async (type: string) => {
  console.log('URL', `${RECIPE}/type?=${type}`);
  const resRecipes = await apiClient.get(`${RECIPE}?type=${type}`);
  if (resRecipes) return resRecipes;
};

export const createUserRecipe = async (recipe: any) => {
  apiClient
    .post(`${RECIPE}${CREATE}`, recipe)
    .then(() => console.log('SAVE NEW RECIPE'))
    .catch((e) => console.log(e));
};
