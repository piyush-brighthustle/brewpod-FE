import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import styles from './Popover.styles';
import TextField from '../../components/TextField/TextField';

interface PopoverProps {
  items: { name: string; icon: any }[];
  onClose: () => void;
}

const Popover: React.FC<PopoverProps> = ({ items, onClose }) => {
  return (
    <View style={styles.container}>
      {items?.map((item) => (
        <TouchableOpacity key={item.name} style={styles.button}>
          <Image source={item.icon} style={styles.image} />
          <TextField text={item.name} />
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <TextField text={`X`} />
      </TouchableOpacity>
    </View>
  );
};

export default Popover;
