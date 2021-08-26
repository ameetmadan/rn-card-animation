import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from 'react-native-elements';
import Deck from './Deck'


const data = [
  {
    id: 1, text: 'Card #1', uri: 'https://via.placeholder.com/600/92c952'
  },
  {
    id: 2, text: 'Card #2', uri: 'https://via.placeholder.com/600/771796'
  },
  {
    id: 3, text: 'Card #3', uri: 'https://via.placeholder.com/600/24f355'
  },
  {
    id: 4, text: 'Card #4', uri: 'https://via.placeholder.com/600/d32776'
  },
  {
    id: 5, text: 'Card #5', uri: 'https://via.placeholder.com/600/f66b97'
  },
  {
    id: 6, text: 'Card #6', uri: 'https://via.placeholder.com/600/56a8c2'
  },
  {
    id: 7, text: 'Card #7', uri: 'https://via.placeholder.com/600/b0f7cc'
  },
  {
    id: 8, text: 'Card #8', uri: 'https://via.placeholder.com/600/54176f'
  },
];

export default class App extends React.Component {
  renderCard(item) {
    return (
      <Card
        key={item.id}>
        <Card.Image source={{ uri: item.uri }} style={{ marginBottom: 10 }} />
        <Card.Title>{item.text}</Card.Title>
      </Card>
    )
  };

  renderNoMoreCards() {
    return (
      <Card>
        <Card.Title style={{ padding: 10 }}> Nothing left here!</Card.Title>
      </Card>
    )

  }
  render() {
    return (
      <View style={styles.container} >
        {/* <Text>Open up App.tsx to start working on your app!</Text> */}
        <Deck
          data={data}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeLeft={() => { console.log('swiped left') }}
          onSwipeRight={() => { console.log('swiped right') }}
        />
        <StatusBar style="auto" />
      </View>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
    backgroundColor: '#fff',
  },
});
