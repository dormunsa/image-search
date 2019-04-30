import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeLayout from "../NavigatorLayouts/HomePage/HomeLayout";
import FavoritesLayout from "../NavigatorLayouts/Favorites/FavoritesLayout";
import FullPictureLayout from "../NavigatorLayouts/FullPicture/FullPictureLayout";

const AppNavigator = createStackNavigator({
  HomePage: { screen: HomeLayout },
  Favorites: { screen: FavoritesLayout },
  FullPicture: { screen: FullPictureLayout }
});

export default createAppContainer(AppNavigator);
