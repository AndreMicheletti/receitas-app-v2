import React from 'react';
import { View, WebView } from 'react-native';

import colors from "../colors";

class RecipeWebViewScreen extends React.PureComponent {

  static navigationOptions = {
    title: 'Ver receita',
    headerTintColor: colors.textWhite,
    headerStyle: {
      backgroundColor: colors.orange,
    },
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
  }

  render() {
    const uri = this.props.navigation.getParam('url', null);

    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri }}
        />
      </View>
    )
  }

}

export default RecipeWebViewScreen;
