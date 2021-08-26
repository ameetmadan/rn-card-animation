import * as React from 'react';
import { View, PanResponder, Animated, Dimensions, LayoutAnimation, UIManager } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

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

interface position {
    position: string;
}

interface onSwipeLeft {
    onSwipeLeft: any;
    panResponder: any;
    position: any;
    index: number;
}

interface onSwipeRight {
    onSwipeLeft: any;
    panResponder: any;
    position: any;
    index: number;
}

interface renderCard {
    onSwipeLeft: any;
    panResponder: any;
    position: any;
    index: number;
}

class Deck extends React.Component<position, onSwipeLeft, onSwipeRight> {
    static defaultProps = {
        onSwipeRight: () => { },
        onSwipeLeft: () => { }
    }
    constructor(props) {
        super(props);

        const position = new Animated.ValueXY({ x: 0, y: 0 });

        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({ x: gesture.dx, y: gesture.dy })
                // console.log(gesture);
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) { console.log('swipe right'), this.forceSwipe('right'); }
                else if (gesture.dx < -SWIPE_THRESHOLD) { console.log('swipe left'), this.forceSwipe('left'); }
                else {
                    this.resetPosition();
                }
            }
        });

        this.state = { panResponder, position, index: 0 };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props.data) {
            this.setState({ index: 0 });

        }
    }

    componentDidUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
        LayoutAnimation.spring();
    }

    forceSwipe(direction) {
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(this.state.position, {
            toValue: { x, y: 0 },
            duration: SWIPE_OUT_DURATION,
            useNativeDriver: false
        }).start(() => { this.onSwipeComplete(direction) });
    }

    onSwipeComplete(direction) {
        const { onSwipeLeft, onSwipeRight, data } = this.props;
        const item = data[this.state.index];
        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
        this.state.position.setValue({ x: 0, y: 0 });
        this.setState({ index: this.state.index + 1 });
    }

    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false
        }).start();
    }

    getCardsStyle() {
        const { position } = this.state;
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange: ['-120deg', '0deg', '120deg']
            // inputRange: 500 px left, default, 500px right
            // outputRange: using interpolate, move the card slowly from 0 degrees to -120 degrees and do the same when dragged towards the right side
        });

        return {
            ...position.getLayout(),
            transform: [{ rotate }]
        };
    }

    renderCards() {
        if (this.state.index >= this.props.data.length) {
            return this.props.renderNoMoreCards();
        }
        return this.props.data.map((item, cardIndex) => {
            if (cardIndex < this.state.index) { return; }
            if (cardIndex === this.state.index) {
                return (
                    <Animated.View
                        key={item.id}
                        style={[this.getCardsStyle(), styles.cardStyle]}
                        {...this.state.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }
            return (
                <Animated.View
                    key={item.id}
                    style={[styles.cardStyle, { top: 10 * (cardIndex - this.state.index) }]} >
                    {this.props.renderCard(item)}
                </Animated.View>
            );
        }).reverse();
    }

    render() {
        return (
            <View>
                {this.renderCards()}
            </View >
        )
    }
}

const styles = {
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH - 20,
    }
};

export default Deck;