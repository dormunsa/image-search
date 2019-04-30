import { ADD_ITEM_TO_FAVORITES } from "./FavoritesLayoutActionTypes";

const initialState = {
  favoritesList: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_FAVORITES:
      return {
        ...state,
        favoritesList: [...state.favoritesList, action.data.item]
      };
    default:
      return state;
  }
};
