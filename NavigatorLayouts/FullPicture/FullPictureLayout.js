import React, { Component } from "react";
import { View, Alert } from "react-native";
import { Card, Button } from "react-native-elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FavoritesLayoutActions from "../Favorites/FavoritesLayoutActions";

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      FavoritesLayoutActions: bindActionCreators(
        FavoritesLayoutActions,
        dispatch
      )
    }
  };
}
const mapStateToProps = ({ FavoritesLayout }) => {
  return {
    favoritesList: FavoritesLayout.favoritesList
  };
};

export class FullPictureLayout extends Component {
  constructor(props) {
    super(props);
    this.addItemToFavorites = this.addItemToFavorites.bind(this);
  }
  static navigationOptions = ({ navigation }) => ({
    title: "Picture",
    headerTitleStyle: {
      fontSize: 28,
      color: "#fff"
    },
    headerTintColor: "#fff",
    headerStyle: {
      height: 75,
      backgroundColor: "#000",
      color: "#fff"
    }
  });

  addItemToFavorites(item) {
    const {
      handleAddItemToFavorites
    } = this.props.actions.FavoritesLayoutActions;
    handleAddItemToFavorites(item);
  }
  render() {
    return (
      <View>
        <Card
          style={{ flex: 1 }}
          image={{
            uri: this.props.navigation.state.params.picData.largeImageURL
          }}
          imageStyle={{ height: 500 }}
        >
          <Button
            backgroundColor="#000"
            buttonStyle={{
              borderRadius: 20
            }}
            title="Add"
            onPress={() => {
              this.addItemToFavorites(
                this.props.navigation.state.params.picData
              );
              Alert.alert("Success");
            }}
          />
        </Card>
      </View>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullPictureLayout);
