import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { Slides } from '../components';

const TUTORIAL_DATA = [
  { text: 'Este é o ReceitApp!', color: '#FEB658' },
  { text: 'Decida se quer uma receita doce ou salgada', color: '#3DAF7B' },
  { text: 'Insira os ingredientes que você tem em casa', color: '#C85177' },
  { text: 'Descubra uma receita fácil para fazer agora mesmo!', color: '#FE8558' },
];

class TutorialScreen extends React.PureComponent {

 async componentWillMount() {
    // skip if already made tutorial
    const completed = await AsyncStorage.getItem('tutorialComplete')
    if (completed) {
      this.nextScreen();
    }
  }

  nextScreen() {
    this.props.navigation.navigate('recipeSearch');
  }

  onComplete() {
    // save that tutorial was completed
    AsyncStorage.setItem('tutorialComplete', 'true');
    this.nextScreen();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Slides
          data={TUTORIAL_DATA}
          buttonTitle="Começar!"
          textStyle={{ fontSize: 35, color: 'white' }}
          onButtonPress={() => this.onComplete()}
          buttonProps={{
            style: { backgroundColor: '#E17F5B' },
            textStyle: { color: 'white', fontWeight: '700', fontSize: 27 },
          }}
        />
      </View>
    )
  }
}

export default TutorialScreen;
