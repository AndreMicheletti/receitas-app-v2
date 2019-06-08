import React from 'react';
import { View, ScrollView, TextInput, Keyboard, ActivityIndicator, InteractionManager } from 'react-native';
import Button from './Button'
import _ from 'lodash';

import colors from '../colors'
import styles from '../styles'

const DEFAULT_OPTIONS = [
  'leite', 'leite integral', 'ovo', 'frango', 'batata', 'carne', 'feijao', 'arroz'
];

class AutoCompleteInput extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      match: [],
      loading: false
    };
  }

  _textChanged(text) {
    if (text === '') {
      this.setState({text, match: [], loading: false});
    } else {
      this.setState({text, loading: true});

      setTimeout(() => {
        const match = _.filter(this.props.options, opt => opt && opt.toLowerCase().includes(text.toLowerCase()));
        if (text === this.state.text) {
          this.setState({text, match, loading: false});
        }
      }, 50);
    }
  }

  renderOptions() {
    if (this.state.loading) {
      return (
        <ActivityIndicator color={colors.textBlack} size={25} />
      );
    }

    return this.state.match.map(value => (
      <Button
        key={value}
        text={value}
        type='native'
        textStyle={{color: colors.textBlack}}
        style={{ width: 300 }}
        onPress={() => this.handleSelected(value)}
      />
    ))
  }

  handleSelected(value) {
    this.setState({ text: '', match: []});
    Keyboard.dismiss();
    this.props.onSelect(value);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TextInput
          style={componentStyles.input}
          onChangeText={(text) => this._textChanged(text)}
          value={this.state.text}
          placeholder="Pesquisar ingrediente..."
          placeholderTextColor="gray"
          selectionColor={colors.orangeDark}
        />
        {(this.state.match.length > 0 || this.state.loading) &&
          (<ScrollView
            keyboardShouldPersistTaps='handled'
            style={componentStyles.options}
            contentContainerStyle={styles.columns}
          >
            {this.renderOptions()}
          </ScrollView>)}
      </View>
    )
  }
}

AutoCompleteInput.defaultProps = {
  options: DEFAULT_OPTIONS,
  onSelect: (selected) => console.log(`selected ${selected}`)
};

const componentStyles = {
  input: {
    height: 40,
    width: 300,
    backgroundColor: colors.white,
    paddingLeft: 5,
    paddingRight: 5,
    color: colors.textBlack,
  },
  options: {
    position: 'absolute',
    top: 40,
    zIndex: 9999,
    backgroundColor: 'white',
    width: 300,
    maxHeight: 150,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 8,
    color: colors.textBlack,
  },
  optionButton: {
    height: 30,
    width: 300,
    padding: 15
  }
};

export default AutoCompleteInput