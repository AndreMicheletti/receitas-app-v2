import React from 'react';
import { View, Text, TouchableNativeFeedback, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const defaultProps = {
  onPress: () => console.log('button pressed!'),
  text: '',
  textStyle: { fontSize: 20, color: '#000' },
  iconLeft: null,
  iconRight: null,
  type: 'native'
}

const selectComponent = (ctype) => {
  switch (ctype) {
    case 'native':
      return TouchableNativeFeedback;
    case 'highlight':
      return TouchableHighlight;
    case 'opacity':
      return TouchableOpacity;
    default:
      return TouchableWithoutFeedback;
  }
};

const Button = (forward) => {
  const props = {
    ...defaultProps,
    ...forward
  };
  const Touchable = selectComponent(props.type);
  return (
    <Touchable
      onPress={props.onPress}
    >
      <View style={[styles.defaultButtonView, props.style]}>
        {/* Left Icon */}
        {props.iconLeft && (
          <React.Fragment>
            <Ionicons name={props.iconLeft.name} size={props.iconLeft.size} color={props.iconLeft.color} />
            <View style={{ width: 8 }} />
          </React.Fragment>
        )}

        {/* Text */}
        <Text style={props.textStyle}>
          {props.text}
        </Text>


        {/* Right Icon */}
        {props.iconRight && (
          <React.Fragment>
            <View style={{ width: 8 }} />
            <Ionicons name={props.iconRight.name} size={props.iconRight.size} color={props.iconRight.color} />
          </React.Fragment>
        )}
      </View>
    </Touchable>
  )
};

const styles = {
  defaultButtonView: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center'
  }
};

export default Button;
