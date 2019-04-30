import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HomeLayoutActions from "./HomeLayoutActions";
import FavoritesLayoutActions from "../Favorites/FavoritesLayoutActions";
import SearchInput from "../../Components/SearchInput";
import ListStyleButtons from "../../Components/ListStyleButtons";
import PicturesList from "../../Components/PicturesList";

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      HomeLayoutActions: bindActionCreators(
          HomeLayoutActions,
           dispatch
        ),
      FavoritesLayoutActions: bindActionCreators(
        FavoritesLayoutActions,
        dispatch
      )
    }
  };
};

const mapStateToProps = ({ HomeLayout, FavoritesLayout }) => {
  return {
    style: HomeLayout.style,
    picsList: HomeLayout.picsList,
    isLoading: HomeLayout.isLoading,
    favoritesList: FavoritesLayout.favoritesList
  };
};

export class HomeLayout extends Component {
  constructor(props) {
    super(props);
    this.changeViewStyle = this.changeViewStyle.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.loadFavorites = this.loadFavorites.bind(this);
  }
  componentDidMount() {
    this.handleSearch("");
    this.loadFavorites();
  }

  loadFavorites() {
    const { addItemToFavorites } = this.props.actions.FavoritesLayoutActions;
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          item = JSON.parse(store[i][1]);
          addItemToFavorites(item);
        });
      });
    });
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Images Search",
    headerTitleStyle: {
      fontSize: 28,
      color: "#fff"
    },
    headerTintColor: "#fff",
    headerStyle: {
      height: 75,
      backgroundColor: "#000"
    },
    headerRight: (
      <Icon
        raised
        name="star"
        type="font-awesome"
        color="#FFFF33"
        onPress={() => {
          navigation.navigate("Favorites");
        }}
      />
    )
  });

  changeViewStyle() {
    const { style } = this.props;
    const { handleChangeViewStyle } = this.props.actions.HomeLayoutActions;

    if (style === "Grid") {
        handleChangeViewStyle("List");
    } else {
        handleChangeViewStyle("Grid");
    }
  }

  handleSearch(query) {
    const {
        handleSearchConfirm,
      handleUpdateIsLoading
    } = this.props.actions.HomeLayoutActions;
    handleSearchConfirm(query);
    setTimeout(() => {
      handleUpdateIsLoading(false);
    }, 800);
    handleUpdateIsLoading(true);
  }

  render() {
    const { style, isLoading, picsList } = this.props;
    return (
      <View>
        <SearchInput handleSearch={this.handleSearch} />
        <ListStyleButtons handlePress={this.changeViewStyle} />
        {isLoading == true ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <View>
            {picsList.length == 0 ? (
              <Text style={styles.notFound}>There is no results</Text>
            ) : (
              <PicturesList
                style={style}
                picsList={this.props.picsList}
                navigation={this.props.navigation}
              />
            )}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  notFound: {
    marginTop: 300,
    fontSize: 25,
    textAlign: "center"
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeLayout);
