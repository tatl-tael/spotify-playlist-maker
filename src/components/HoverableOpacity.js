import React from "react";
import { TouchableOpacity, View } from "react-native";

class HoverableOpacity extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: props.style.backgroundColor };
  }

  render() {
    const { style, onHover, onPress, ...passThrough } = this.props;

    return (
      <TouchableOpacity
        style={{ ...this.props.style, backgroundColor: this.state.color }}
        {...passThrough}
        onPress={onPress}
      >
        <View
          style={{flex: 1, borderRadius: this.props.style.borderRadius, justifyContent: 'center'}}
          onMouseOver={() => {
            this.setState({ color: onHover.backgroundColor });
          }}
          onMouseOut={() => {
            this.setState({ color: style.backgroundColor });
          }}
        >
          {this.props.children}
        </View>
      </TouchableOpacity>
    );
  }
}

export default HoverableOpacity;
