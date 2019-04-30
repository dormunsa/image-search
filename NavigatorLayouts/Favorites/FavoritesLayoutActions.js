import { ADD_ITEM_TO_FAVORITES } from "./FavoritesLayoutActionTypes";
import { AsyncStorage } from "react-native";

const addItemToFavorites = item => ({
  type: ADD_ITEM_TO_FAVORITES,
  data: { item }
});
const handleAddItemToFavorites = item => async dispatch => {
  let isInFavoritesIndicator = await isInFavorites(item);
  if (!isInFavoritesIndicator) {
    dispatch(addItemToFavorites(item));
    await AsyncStorage.setItem(`${item.id}`, JSON.stringify(item));
  }
};

const isInFavorites = async item => {
  var isInFavoritesIndicator = false;
  await AsyncStorage.getItem(`${item.id}`, (err, result) => {
    if (result != null) {
      isInFavoritesIndicator = true;
    } else {
      isInFavoritesIndicator = false;
    }
  });
  return isInFavoritesIndicator;
};

export default {
  addItemToFavorites,
  handleAddItemToFavorites,
  isInFavorites
};
