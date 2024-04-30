import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export const scaleHeight = (height: number) => verticalScale(height);

export const scaleWidth = (width: number) => scale(width);

export const scaleFont = (size: number) => verticalScale(size);

export const scalePadding = (num: number) => moderateScale(num);

export const scaleMargin = (num: number) => moderateScale(num);
