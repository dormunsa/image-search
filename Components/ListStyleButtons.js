import React, { Component } from "react";
import { ButtonGroup } from "react-native-elements";

export default class ListStyleButtons extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedIndex: 0 };
    this.toggleIndex = this.toggleIndex.bind(this);
  }

  toggleIndex(selectedIndex) {
    this.setState({ selectedIndex });
    this.props.handlePress();
  }

  render() {
    const buttons = ["Grid Style", "List Style"];
    const { selectedIndex } = this.state;
    return (
      <ButtonGroup
        onPress={this.toggleIndex}
        buttonStyle={{ borderRadius: 20 }}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{ height: 100 }}
        containerStyle={{ backgroundColor: "#000", borderRadius: 20 }}
      />
    );
  }
}
