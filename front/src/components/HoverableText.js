import React from "react";
import { View, Text } from "react-native";

class HoverableText extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: props.style.color };
  }

  render() {
    const { style, hoverStyle, content, ...passThrough } = this.props;

    return (
      <View
        onMouseOver={() => {
          this.setState({ color: hoverStyle.color });
        }}
        onMouseOut={() => {
          this.setState({ color: style.color });
        }}
      >
        <Text
          style={{ ...this.props.style, color: this.state.color }}
          {...passThrough}
        >
          {this.props.content}
        </Text>
      </View>
    );
  }
}

export default HoverableText;
