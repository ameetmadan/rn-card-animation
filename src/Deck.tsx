import * as React from 'react';
import { View, PanResponder, Animated } from 'react-native';

interface Data {
    id: number;
    text: string;
    uri: string;
}

interface RenderCard {
    renderCard: any,
}

// Sample Gesture Object {
// "_accountsForMovesUpTo": 24896339.125093,
// "dx": -115,
// "dy": -81,
// "moveX": 65.33332824707031,
// "moveY": 436.6666564941406,
// "numberActiveTouches": 1,
// "stateID": 0.3120581121504723,
// "vx": 0.0020020022955800094,
// "vy": 0,
// "x0": 180.3333282470703,
// "y0": 517.6666564941406,
//   }

class Deck extends React.Component {
    constructor(props) {
        super(props);

        const position = new Animated.ValueXY({ x: 0, y: 0 });

        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy })
                console.log(gesture);
            },
            onPanResponderRelease: () => { }
        });

        this.state = { panResponder, position };
    }

    renderCards() {
        return this.props.data.map(item => {
            return this.props.renderCard(item)
        });
    }

    render() {
        return (
            <Animated.View {...this.state.panResponder.panHandlers}
                style={this.state.position.getLayout()}>
                {this.renderCards()}
            </Animated.View>
        )
    }
}

export default Deck;