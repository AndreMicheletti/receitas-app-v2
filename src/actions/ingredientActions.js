import axios from 'axios';

import { BACKEND_URL } from '../const';
import {
  FETCH_INGREDIENTS_ATTEMPT,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_FAILED,
  INGREDIENT_SELECT,
  INGREDIENT_REMOVE,
  UNSELECT_ALL,
} from './types';

export const ingredientSelect = (ing) => {
  return { type: INGREDIENT_SELECT, payload: ing };
};

export const removeIngredient = (ing) => {
  return { type: INGREDIENT_REMOVE, payload: ing };
};

export const unselectAllIngredient = () => {
  return { type: UNSELECT_ALL };
};

export const fetchIngredients = (forCategory) => {
  return (dispatch) => {
    dispatch({ type: FETCH_INGREDIENTS_ATTEMPT });
    axios.get(`${BACKEND_URL}/ingredient/${forCategory}`)
      .then((response) => {
        dispatch({
          type: FETCH_INGREDIENTS_SUCCESS,
          payload: response.data.success,
        });
        return null;
      })
      .catch(() => {
        dispatch({ type: FETCH_INGREDIENTS_FAILED });
        return null;
      });
  };
};
