import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, ScrollView, Text } from 'react-native';
import { COLOR_PALETTE } from '../../types/enums';
import Divider from '../../components/Divider/Divider';
import { Item, Label } from '../../utils/data';
import styles from './Accordion.styles';

type AccordianProps = {
  label: Label;
  items: Item[];
  onItemPress: (labelId: number, itemIndex: number, newQuantity: string) => void;
};

const Accordion = ({ label, items, onItemPress }: AccordianProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container} key={label.id}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <View style={styles.spaceBetween}>
          <Text style={styles.accordianHeader}>{label.name}</Text>
          <Text style={styles.totalQuantity}>{label.totalQuantity} g</Text>
        </View>
      </TouchableOpacity>
      {expanded && (
        <View>
          {items?.map((item, index) => (
            <>
              <View key={index} style={styles.spaceBetween}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.inputContainer}>
                  <TextInput value={item.quantity.toString()} onChangeText={(text) => onItemPress(label.id, index, text)} style={styles.input} />
                  <Text style={styles.inputSuffix}>g</Text>
                </View>
              </View>
              {index !== items.length - 1 && <Divider width={2} borderColor={COLOR_PALETTE.DRIFTWOOD} />}
            </>
          ))}
        </View>
      )}
    </View>
  );
};

export default Accordion;
