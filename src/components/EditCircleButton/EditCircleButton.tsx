import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import ImageLinks from '../../assets/images';
import styles from './EditCircleButton.styles';
import { STRINGS } from '../../types/strings';
import { useNavigation } from '@react-navigation/native';
import { COLOR_PALETTE } from '../../types/enums';

interface EditCircleButtonProps {
  tintColor?: string;
  textColor?: string;
  handleEdit?: () => void;
  editing?: boolean;
}

const EditCircleButton: React.FC<EditCircleButtonProps> = ({ tintColor, textColor, handleEdit, editing }) => {
  const navigate = useNavigation();
  return (
    <TouchableOpacity style={styles.editButtonContainer} onPress={handleEdit}>
      <View style={[styles.editImageContainer, { borderColor: !editing ? tintColor : COLOR_PALETTE.MIDNIGHT, backgroundColor: !editing ? COLOR_PALETTE.SEASHELL : COLOR_PALETTE.MIDNIGHT }]}>
        <Image source={ImageLinks.EDIT_BIG_ICON} style={styles.editImage} tintColor={!editing ? tintColor : COLOR_PALETTE.SEASHELL} />
      </View>
      <Text style={[styles.editText, { color: editing ? COLOR_PALETTE.MIDNIGHT : textColor }]}>{`${STRINGS.EDIT} ${STRINGS.RECIPE}`}</Text>
    </TouchableOpacity>
  );
};

export default EditCircleButton;
