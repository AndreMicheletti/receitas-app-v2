import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';

import TutorialScreen from './screens/TutorialScreen'
import RecipeSearchScreen from './screens/RecipeSearchScreen'


const MainNavigator = createStackNavigator({
  // Recipe List Screen
  recipeSearch: RecipeSearchScreen
}, {
  // Options
  initialRouteName: 'recipeSearch',
  headerMode: 'float',
  lazy: true,
});

const Tutorial = createStackNavigator({
  tutorial: {
    screen: TutorialScreen,
    navigationOptions: {
      title: '',
      header: null,
    },
  },
});

const RootNavigator = createSwitchNavigator({
  welcome: Tutorial,
  main: MainNavigator,
}, {
  initialRouteName: 'welcome',
});

export default createAppContainer(RootNavigator);
