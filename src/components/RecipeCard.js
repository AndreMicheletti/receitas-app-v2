import React from 'react';
import { View, Text, Image, Dimensions, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from '../styles';
import colors from '../colors';
import Button from "./Button";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class RecipeCard extends React.PureComponent {

  onViewRecipe() {
    this.props.onViewRecipe(this.props.data);
  }

  onLikeRecipe() {

  }

  renderIngredients() {
    const { ingredients_pretty } = this.props.data;

    return ingredients_pretty.map(ing => {
      return (
        <Text
          key={ing}
          style={{ fontSize: 16, color: colors.textGray }}
        >
          {ing}
        </Text>
      )
    })
  }

  renderInstructions() {
    const { instructions } = this.props.data;

    return instructions.map(ing => {
      return (
        <Text
          key={ing}
          style={{ fontSize: 14, color: colors.textGray }}
        >
          {ing}
        </Text>
      )
    })
  }

  render() {

    const { name, photo, portion_yield, likes, category } = this.props.data;

    return (
      <View style={componentStyles.cardContainer}>

        {/* Image Section */}
        <View style={{ flex: 1, alignSelf: 'center' }}>
          <Image
            style={{ width: SCREEN_WIDTH - 10, height: 200, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
            source={{ uri: photo }}
            resizeMode='cover'
          />
        </View>

        {/* Title Section */}
        <View style={componentStyles.titleSection}>
          <View style={{ flex: 6 }}>
            <Text style={componentStyles.titleText}>
              {name}
            </Text>
          </View>

          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Text style={{ color: colors.textBlack, fontSize:15 }}>
              {likes}
            </Text>
            <View style={{ width: 4 }} />
            <Ionicons
              name='md-heart'
              color={colors.textGray}
              size={20}
            />

            <View style={{ width: 8 }} />

            <Text style={{ color: colors.textBlack, fontSize:15 }}>
              {portion_yield}
            </Text>
            <View style={{ width: 4 }} />
            <Ionicons
              name='md-people'
              color={colors.textGray}
              size={25}
            />

          </View>
        </View>

        {/* Ingredients Section */}
        <View style={componentStyles.contentSection}>
          {this.renderIngredients()}
        </View>

        {/* Instructions Section */}
        <View style={componentStyles.contentSection}>
          <ScrollView
            style={{ flex: 1, maxHeight: 80 }}
          >
            {this.renderInstructions()}
          </ScrollView>
        </View>

        {/* Buttons Section */}
        <View style={componentStyles.buttonSection}>
          <Button
            text='VER RECEITA'
            style={{ paddingLeft: 15, paddingRight: 15, padding: 10, backgroundColor: colors.pink, borderRadius: 4, alignItems: 'center' }}
            iconLeft={{ name: 'md-bookmarks', size: 18, color: colors.white }}
            textStyle={{ color: colors.textWhite, fontSize: 15 }}
            onPress={() => this.onViewRecipe()}
          />
          <Button
            iconRight={{ name: 'md-heart', size: 35, color: colors.pink }}
            text={null}
            onPres={() => this.onLikeRecipe()}
          />
        </View>

      </View>
    )
  }
}

const componentStyles = {
  cardContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginLeft: 4,
    marginRight: 4,
    marginTop: 8,
  },
  titleSection: {
    flex: 1,
    padding: 5,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textBlack
  },
  contentSection: {
    flex: 1,
    padding: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  buttonSection: {
    flex: 1,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
};

export default RecipeCard;