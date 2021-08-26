# React Native "Tinder-like" Card Animation

This is from a course by Stephen Grider on Udemy, but I decided to make it available here for usage in any React Native app.

I will try to summarize the content of the course here so that you know exactly what variables to change when adding this to your app.

TODO: fix typescript errors

## App.tsx

- `renderCard()`: Using [react-native-elements]() Card, I created the basic card element and passed the values using `const data = []`. This can be modified by adding an API to it so that it is more useful.

- `renderNoMoreCards()`: Here I handle what happens when the last card is swiped. You could add a button here and then using a function get more data from your API.

## Deck.tsx

- `SCREEN_WIDTH`: Using the Dimensions library from React Native this is set dynamically for all devices
- `SWIPE_THRESHOLD`: This is to decide when we want to recognize a swipe right as such, change this to a higher number to let the user move more than a quarter of the card
- `SWIPE_OUT_DURATION`: How fast we want our animation to be


- `panResponder`: This part of the code has these sub-elements
  - `onStartShouldSetPanResponder`: With this we can set if the element we add this to should be able to react to gestures. Default mostly `true`
  - `onPanResponderMove`: What do we do when the user is moving the element, so this is kind of the brain of the whole operation
  - `onPanResponderRelease`: How does the element react when the user lets go of the screen.

- `UIManager.setLayoutAnimationEnabledExperimental`: Necessary for Android

- `forceSwipe(direction)`: By passing the direction dynamically here we don't need to handle both swipeRight and swipeLeft in their own functions. Additionally, we can call `onSwipeComplete` directly after the function is finished by passing it as a parameter to `start()`
- `onSwipeComplete`: What we want to do when the swipe is complete. Here `onSwipeRight` and `onSwipeLeft` let you define different actions for each direction. An idea here could be adding a POST call to an API saving the "taste" of the person. Possibly in recipe app you could add some "Artifical Intelligence" (yeah, I know) and get better recipe ideas with this.
- `resetPosition`: Looking inside the `panResponder` we see the usage og this function. It handles the animation when neither the left swipe nor the right swipe are called.
- `getCardsStyle`: Here we handle the rotation animation of the cards. The `inputRange` defines how much of the `SCREEN_WIDTH` we can use for the animation. The `outputRange` tells us how much we rotate the cards. With `interpolate`, the magic happens!
- `renderCards`: Here we handle the logic for display the "stack" of the cards.

# Demo
![Demo](https://github.com/ameetmadan/rn-card-animation/blob/master/demo.gif)