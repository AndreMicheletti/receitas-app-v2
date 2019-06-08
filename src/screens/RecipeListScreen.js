import React from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { fetchRecipes } from "../actions/recipesActions";

import { RecipeCard } from '../components';

import styles from "../styles";
import colors from "../colors";

class RecipeListScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'Aqui estão suas receitas',
    headerTintColor: colors.textWhite,
    headerStyle: {
      backgroundColor: colors.orange,
    },
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  componentWillMount() {
    // call fetch
    this.props.fetchRecipes('salgado', this.props.ingredients.selected)
  }

  constructor(props) {
    super(props);
    this.state = {}
  }

  _renderItem(item) {
    return (
      <RecipeCard
        key={item._id}
        data={item}
        onViewRecipe={({url}) => this.props.navigation.navigate('recipeWebView', { url })}
      />
    )
  }

  renderLoading() {
    return (
      <View style={{ flex: 1, ...styles.center}}>
        <ActivityIndicator color={colors.orange} size={40} />
      </View>
    )
  }

  render() {
    if (this.props.recipes.loading) {
      return this.renderLoading();
    }

    return (
      <View style={{ flex: 1, paddingBottom: 20 }}>
        <FlatList
          data={this.props.recipes.list}
          renderItem={({item}) => this._renderItem(item)}
          keyExtractor={(item) => item._id}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
    ingredients: state.ingredients,
  }
};

export default connect(mapStateToProps, { fetchRecipes })(RecipeListScreen);
