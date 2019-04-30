import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  FlatList
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import FavoritesLayoutActions from "./FavoritesLayoutActions";

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

export class FavoritesLayout extends Component {
  constructor(props) {
    super(props);
    this._keyExtractor = this._keyExtractor.bind(this);
    this.renderGridStlyePic = this.renderGridStlyePic.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Favorites",
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
  _keyExtractor(item) {
    return item.id.toString();
  }

  renderGridStlyePic({ item }) {
    return (
      <TouchableOpacity style={{ flex: 1, flexDirection: "column", margin: 5 }}>
        <Image style={styles.image} source={{ uri: item.previewURL }} />
      </TouchableOpacity>
    );
  }
  render() {
    const { favoritesList } = this.props;
    return (
      <View>
        {favoritesList.length == 0 ? (
          <Text style={styles.notFound}>There is no favorites pictures</Text>
        ) : (
          <View>
            <FlatList
              data={favoritesList}
              renderItem={this.renderGridStlyePic}
              numColumns={2}
              keyExtractor={this._keyExtractor}
            />
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  image: {
    height: 200,
    justifyContent: "center",
    alignItems: "center"
  },
  notFound: {
    marginTop: 300,
    fontSize: 25,
    textAlign: "center"
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritesLayout);
