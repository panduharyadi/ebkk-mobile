import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  Text,
} from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.25;
const ROTATION_ANGLE = 10;

interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeRight: (cardId?: string) => void;
  onSwipeLeft: (cardId?: string) => void;
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  onSwipeRight,
  onSwipeLeft,
}) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const rotation = useRef(new Animated.Value(0)).current;

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: pan.x, translationY: pan.y } }],
    { useNativeDriver: false }
  );

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      const rotateValue = (event.nativeEvent.translationX / width) * ROTATION_ANGLE;
      rotation.setValue(rotateValue);
    }

    if (event.nativeEvent.state === State.END) {
      const { translationX } = event.nativeEvent;
      
      if (translationX > SWIPE_THRESHOLD) {
        // gesere kanan - beli
        Animated.parallel([
          Animated.timing(pan, {
            toValue: { x: width * 1.5, y: 0 },
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(rotation, {
            toValue: ROTATION_ANGLE,
            duration: 300,
            useNativeDriver: false,
          }),
        ]).start(() => {
          onSwipeRight();
          pan.setValue({ x: 0, y: 0 });
          rotation.setValue(0);
        });
      } else if (translationX < -SWIPE_THRESHOLD) {
        // geser kiri - skip
        Animated.parallel([
          Animated.timing(pan, {
            toValue: { x: -width * 1.5, y: 0 },
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(rotation, {
            toValue: -ROTATION_ANGLE,
            duration: 300,
            useNativeDriver: false,
          }),
        ]).start(() => {
          onSwipeLeft();
          pan.setValue({ x: 0, y: 0 });
          rotation.setValue(0);
        });
      } else {
        Animated.parallel([
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }),
          Animated.spring(rotation, {
            toValue: 0,
            useNativeDriver: false,
          }),
        ]).start();
      }
    }
  };

  const cardStyle = {
    transform: [
      { translateX: pan.x },
      { translateY: pan.y },
      {
        rotate: rotation.interpolate({
          inputRange: [-ROTATION_ANGLE, 0, ROTATION_ANGLE],
          outputRange: [`-${ROTATION_ANGLE}deg`, '0deg', `${ROTATION_ANGLE}deg`],
        }),
      },
    ],
  };

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View style={[styles.cardContainer, cardStyle]}>
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    zIndex: 3,
  },
});

export default SwipeableCard;