import ImageLinks from '../../assets/images';
import React, { FC, ReactElement, useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity, Modal, View, Image, ViewStyle } from 'react-native';
import styles from './Dropdown.styles';

interface Props {
  label: string;
  data: Array<{ label: string; value: string }>;
  onSelect: (item: { label: string; value: string }) => void;
  dropdownStyle?: ViewStyle;
  dropdownListStyle?: ViewStyle;
}

const Dropdown: FC<Props> = ({ label, data, onSelect, dropdownStyle, dropdownListStyle }) => {
  const DropdownButton = useRef<TouchableOpacity | null>(null);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<ItemType | undefined>(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = (): void => {
    if (DropdownButton.current) {
      DropdownButton.current.measure((_fx: number, _fy: number, _w: number, h: number, _px: number, py: number) => {
        setDropdownTop(py + h);
      });
      setVisible(true);
    }
  };

  type ItemType = {
    label: string;
    value: string;
  };

  const onItemPress = (item: ItemType): void => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderItem = ({ item }: { item: ItemType }): React.ReactElement => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <Text>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={[styles.dropdown, { top: dropdownTop }, dropdownListStyle]}>
            <FlatList data={data} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <TouchableOpacity ref={DropdownButton} style={[styles.button, dropdownStyle]} onPress={toggleDropdown}>
      {renderDropdown()}
      <Text style={[styles.buttonText]}>{(selected && selected.label) || label}</Text>
      <Image source={ImageLinks.ARROW_DOWN} style={{ marginRight: 15, tintColor: 'black' }} />
    </TouchableOpacity>
  );
};

export default Dropdown;
