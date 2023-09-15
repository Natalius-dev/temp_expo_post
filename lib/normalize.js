import { Dimensions, Platform, PixelRatio } from 'react-native';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

export function normalize(size) {
    return PixelRatio.roundToNearestPixel(SCREEN_WIDTH / (SCREEN_WIDTH/size))
}