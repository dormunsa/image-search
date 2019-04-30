import React, { Component } from "react";
import { SearchBar } from "react-native-elements";

export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
    this.handleSearchConfirm = this.handleSearchConfirm.bind(this);
  }

  handleSearchConfirm(query) {
    this.setState({ query });
    this.props.handleSearch(query);
  }

  render() {
    const { query } = this.state;
    return (
      <SearchBar
        placeholder="Image Topic: "
        onChangeText={this.handleSearchConfirm}
        value={query}
      />
    );
  }
}
