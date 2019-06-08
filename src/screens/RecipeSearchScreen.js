import React from 'react';
import { View, Text, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { AutoCompleteInput, Button } from '../components';

import { fetchIngredients, ingredientSelect, removeIngredient, unselectAllIngredient } from '../actions/ingredientActions';

import styles from '../styles';
import colors from '../colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

class RecipeSearchScreen extends React.PureComponent {

  static navigationOptions = {
    header: null,
    title: 'Insira seus ingredientes',
    headerTintColor: colors.textBlack,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    this.props.fetchIngredients('salgado');
  }

  onSearch() {
    this.props.navigation.navigate('recipeList')
  }

  addIngredient(ingredient) {
    // if (this.state.selected.indexOf(ingredient) < 0) {
    //   this.setState({selected: [...this.state.selected, ingredient]})
    // }
    this.props.ingredientSelect(ingredient)
  }

  removeIngredient(ingredient) {
    // this.setState({selected: this.state.selected.filter(ing => ing !== ingredient)})
    this.props.removeIngredient(ingredient)
  }

  renderSelected() {
    return this.props.ingredients.selected.map(ing => {
      return (
        <Button
          key={ing}
          style={screenStyles.selectedButton}
          textStyle={screenStyles.selectedText}
          text={ing}
          onPress={() => this.removeIngredient(ing)}
        />
      )
    })
  }

  renderIngredientInput() {
    if (this.props.ingredients.loading) {
      return (
        <ActivityIndicator size={28} color='white' />
      )
    }

    return (
      <AutoCompleteInput
        onSelect={(ingredient) => this.addIngredient(ingredient)}
        options={this.props.ingredients.list}
      />
    );
  }

  render() {
    return (
      <View style={screenStyles.container}>

        <View style={{ flex: 1, paddingLeft: 20, paddingRight: 20, ...styles.columns, justifyContent: 'flex-start' }}>
          <Text style={[styles.h1, { color: colors.textWhite }]}>
            Olá,
          </Text>
          <Text style={[styles.h2, { color: colors.textWhite }]}>
            que ingredientes você tem?
          </Text>
          <View style={{ flex: 1, paddingTop: 10 }}>
            {this.renderIngredientInput()}
          </View>
        </View>

        <View style={{ flex: 2 }}>
          <View style={{ height: 85, justifyContent: 'center', alignItems: 'stretch', paddingLeft: 20, paddingRight: 20 }}>
            {this.props.ingredients.selected.length > 0 && (
              <React.Fragment>
                <Text style={{ color: colors.textWhite, fontWeight: 'bold', fontSize: 24 }}>
                  Seus ingredientes
                </Text>
                <Text style={{ color: colors.textWhite, fontSize: 14 }}>
                  Toque para remover
                </Text>
              </React.Fragment>)}
          </View>
          <ScrollView
            keyboardShouldPersistTaps='handled'
            style={{ flex: 1 }}
            contentContainerStyle={screenStyles.selectedContent}
          >
            {this.renderSelected()}
          </ScrollView>
        </View>


        <View style={{ width: SCREEN_WIDTH, height: 80, marginTop: 15 }}>
          {this.props.ingredients.selected.length > 0 &&
            <Button
              text='Me indique receitas'
              iconRight={{name: 'md-color-wand', size: 30, color: colors.white}}
              textStyle={{ color: colors.textWhite, fontSize: 22 }}
              style={screenStyles.continueButton}
              onPress={() => this.onSearch()}
            />}
        </View>
      </View>
    )
  }
}

const screenStyles = {
  container: {
    ...styles.columns,
    paddingTop: 35,
    flex: 1,
    backgroundColor: colors.orange
  },
  selectedButton: {
    padding: 8,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: colors.orangeDark,
    backgroundColor: colors.orangeDark,
    marginBottom: 4,
    flex: 1,
    ...styles.center
  },
  selectedContent: {
    width: SCREEN_WIDTH,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  selectedText: {
    fontSize: 18,
    color: colors.textWhite,
    fontWeight: 'bold'
  },
  continueButton: {
    padding: 10
  }
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients
  }
};

export default connect(mapStateToProps, {
  fetchIngredients,
  ingredientSelect,
  removeIngredient,
  unselectAllIngredient
})(RecipeSearchScreen);
