import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';

import TutorialScreen from './screens/TutorialScreen'
import RecipeSearchScreen from './screens/RecipeSearchScreen'
import RecipeListScreen from './screens/RecipeListScreen'
import RecipeWebViewScreen from './screens/RecipeWebViewScreen'


const MainNavigator = createStackNavigator({
  // Recipe List Screen
  recipeSearch: RecipeSearchScreen,
  recipeList: RecipeListScreen,
  recipeWebView: RecipeWebViewScreen,
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
