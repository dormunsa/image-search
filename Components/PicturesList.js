import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import { Card } from "react-native-elements";

export default class PicturesList extends Component {
  constructor(props) {
    super(props);
    this._keyExtractor = this._keyExtractor.bind(this);
    this._keyExtractor2 = this._keyExtractor2.bind(this);
    this.renderGridStlye = this.renderGridStlye.bind(this);
    this.renderListStyle = this.renderListStyle.bind(this);
    this.renderGridStlyePic = this.renderGridStlyePic.bind(this);
    this.renderListStylePic = this.renderListStylePic.bind(this);
  }

  _keyExtractor(item) {
    return item.id.toString();
  }
  _keyExtractor2(item) {
    return (item.id + 1).toString();
  }

  renderGridStlye() {
    return (
      <FlatList
        style={styles.backGround}
        data={this.props.picsList}
        renderItem={this.renderGridStlyePic}
        numColumns={2}
        keyExtractor={this._keyExtractor2}
      />
    );
  }
  renderListStyle() {
    return (
      <FlatList
        style={styles.backGround}
        data={this.props.picsList}
        renderItem={this.renderListStylePic}
        keyExtractor={this._keyExtractor}
        key={this._keyExtractor}
      />
    );
  }
  renderGridStlyePic({ item }) {
    const { navigate } = this.props.navigation;
    return (
      <TouchableOpacity
        onPress={() => navigate("FullPicture", { picData: item })}
        style={{ flex: 1, flexDirection: "column", margin: 5 }}
      >
        <Image style={styles.image} source={{ uri: item.previewURL }} />
      </TouchableOpacity>
    );
  }
  renderListStylePic({ item }) {
    const { navigate } = this.props.navigation;
    return (
      <TouchableOpacity
        onPress={() => navigate("FullPicture", { picData: item })}
      >
        <Card style={{ flex: 1 }}>
          <View style={styles.listItemContainer}>
            <Image
              source={{ uri: item.previewURL }}
              style={styles.listImageItem}
            />
          </View>
          <View style={styles.listItemContainer}>
            <Text style={{ fontSize: 17 }}>{item.tags}</Text>
            <Text>Views: {item.views}</Text>
            <Text>Likes: {item.likes}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }

  render() {
    return this.props.style === "Grid"
      ? this.renderGridStlye()
      : this.renderListStyle();
  }
}

const styles = StyleSheet.create({
  image: {
    justifyContent: "center",
    alignItems: "center",
    height: 150
  },
  listImageItem: {
    height: 75,
    width: 75
  },
  listItemContainer: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 12,
    justifyContent: "center"
  },
  backGround: {
    backgroundColor: "#000"
  }
});
