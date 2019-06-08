import React from 'react';
import { View, Text, FlatList } from 'react-native';

import { RecipeCard } from '../components';

import colors from "../colors";

DATA = [
  {
    "_id" : "5b5fc84d99574241ee98f551",
    "name" : "Doce de banana simples",
    "url" : "http://allrecipes.com.br/receita/7942/doce-de-banana-simples.aspx?o_is=LV",
    "category" : "doce",
    "photo" : "http://brcdn.ar-cdn.com/recipes/originalxl/b6eb4a5b-ccba-4579-8b4a-731d67040154.jpg",
    "ingredients" : [
      {
        "name" : "bananas em rodela",
        "quantity" : "4.0",
        "measure" : "un"
      },
      {
        "name" : "acucar",
        "quantity" : "170.0",
        "measure" : "G"
      },
      {
        "name" : "agua",
        "quantity" : "250.0",
        "measure" : "ML"
      }
    ],
    "ingredients_pretty" : [
      "4 bananas em rodelas",
      "170 g de açúcar",
      "250 ml de água"
    ],
    "instructions" : [
      "Em uma panela, junte todos os ingredientes e cozinhe em fogo médio-baixo até levantar fervura, mexendo de vez em quando.",
      "Quando levantar fervura, tampe parcialmente a panela, deixando um espaço para que o vapor escape, cozinhando em fogo baixo. Quando a calda estiver escura, o doce estará pronto.",
      "Sirva quente ou frio, ou acompanhado de sorvete de creme. Depois de frio, conserve em um pote de vidro com tampa na geladeira por aproximadamente cinco dias."
    ],
    "portion_yield" : 4,
    "likes" : 0.0
  }
];


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

  constructor(props) {
    super(props);
    this.state = {}
  }

  _renderItem(item) {
    return (
      <RecipeCard
        data={item}
        onViewRecipe={({url}) => this.props.navigation.navigate('recipeWebView', { url })}
      />
    )
  }

  render() {
    return (
      <View style={{ flex: 1, paddingBottom: 20 }}>
        <FlatList
          data={DATA}
          renderItem={({item}) => this._renderItem(item)}
          keyExtractor={(item) => item._id}
        />
      </View>
    )
  }
}

export default RecipeListScreen;
