import { Image, View } from 'react-native';
import React from 'react';
import styles from './BeerCard.styles';
import TextField from '../../components/TextField/TextField';
import { scaleFont } from '../../utils/scale';
import { COLOR_CODE, TEXT_COLOR } from '../../types/enums';
import ImageLinks from '../../assets/images';

type Props = {
  title: string;
  description: string;
  name: string;
  rating?: string;
};

const BeerCard = ({ title, description, name, rating }: Props) => {
  return (
    <View style={styles.brewCardContainer}>
      <View style={styles.brewCardTop}>
        <TextField text={title} fontSize={scaleFont(24)} color={COLOR_CODE.COMPLEMENTARY} fontWeight={600} />
        {rating && (
          <View style={styles.ratingCard}>
            <Image source={ImageLinks.RATE_STAR} style={styles.ratingCardImage} />
            <TextField text={rating} color={TEXT_COLOR.WHITE} fontSize={scaleFont(14)} fontWeight={600} />
          </View>
        )}
      </View>
      <TextField text={description} fontSize={scaleFont(12)} color={TEXT_COLOR.GRAY3} />
      <TextField
        text={`By ${name}`}
        fontSize={scaleFont(14)}
        fontWeight={600}
        os={{
          marginTop: 20,
        }}
      />
    </View>
  );
};

export default BeerCard;
