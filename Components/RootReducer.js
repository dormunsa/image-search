import { combineReducers } from "redux";
import FavoritesLayoutReducer from "../NavigatorLayouts/Favorites/FavoritesLayoutReducer";
import HomeLayoutReducer from "../NavigatorLayouts/HomePage/HomeLayoutReducer";

export default combineReducers({
  HomeLayout: HomeLayoutReducer,
  FavoritesLayout: FavoritesLayoutReducer
});
