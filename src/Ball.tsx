import * as React from 'react';
import { View, Animated } from 'react-native';

interface Ball {
    position: any;
}

// Animations always have to answer three questions
// 1. Where is the item right now? Animated.ValueXY
// 2. Where is the element moving to? Animated.Spring
// 3. Which element are we moving? Animated.View

class Ball extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.position = new Animated.ValueXY({ x: 0, y: 0 }); // Where is the item right now?
        Animated.spring(this.position, {
            toValue: { x: 200, y: 500 }, // Where is the element moving to?
            useNativeDriver: false
        }).start();

    }

    render() {
        return (
            // Which element are we moving?
            <Animated.View style={this.position.getLayout()}>
                < View style={styles.ball} />
            </Animated.View>
        )
    }
}


const styles = {
    ball: {
        height: 60,
        width: 60,
        borderRadius: 30,
        borderWidth: 30,
        borderColor: 'black'
    }
};

export default Ball;