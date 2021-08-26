# React Native "Tinder-like" Card Animation

This is from a course by Stephen Grider on Udemy, but I decided to make it available here for usage in any React Native app.

I will try to summarize the content of the course here so that you know exactly what variables to change when adding this to your app.

TODO: fix typescript errors

## App.tsx

- `renderCard()`: Using [react-native-elements]() Card, I created the basic card element and passed the values using `const data = []`. This can be modified by adding an API to it so that it is more useful.

- `renderNoMoreCards()`: Here I handle what happens when the last card is swiped. You could add a button here and then using a function get more data from your API.

## Deck.tsx

- `SCREEN_WIDTH` = Using the Dimensions library from React Native this is set dynamically for all devices
- `SWIPE_THRESHOLD` = This is to decide when we want to recognize a swipe right as such, change this to a higher number to let the user move more than a quarter of the card
- `SWIPE_OUT_DURATION` = How fast we want our animation to be


- `panResponder`: This part od the code has the sub-elements
  - `onStartShouldSetPanResponder`
  - `onPanResponderMove`
  - `onPanResponderRelease`


- `UIManager.setLayoutAnimationEnabledExperimental`


# Demo
![Demo](https://github.com/ameetmadan/rn-card-animation/blob/master/demo.gif)