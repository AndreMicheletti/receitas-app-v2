import {
  FETCH_INGREDIENTS_ATTEMPT,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_FAILED,
  INGREDIENT_SELECT,
  INGREDIENT_REMOVE,
  UNSELECT_ALL,
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  list: [],
  selected: [],
};

const ingredientsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INGREDIENT_SELECT:
      const index = state.selected.indexOf(action.payload);
      if (index < 0) {
        return {
          ...state,
          selected: [...state.selected, action.payload],
        };
      }
      return { ...state };
    case INGREDIENT_REMOVE:
      return {
        ...state,
        selected: state.selected.filter(i => i !== action.payload),
      };
    case UNSELECT_ALL:
      return { ...state, selected: [] };
    case FETCH_INGREDIENTS_ATTEMPT:
      return { ...state, loading: true };
    case FETCH_INGREDIENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        selected: [],
        list: action.payload,
      };
    case FETCH_INGREDIENTS_FAILED:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default ingredientsReducer;
