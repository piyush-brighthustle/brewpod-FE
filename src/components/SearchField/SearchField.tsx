import React, { useState } from 'react';
import { TextInput, View, Keyboard, NativeSyntheticEvent, TextInputChangeEventData, ViewStyle, Image } from 'react-native';
import styles from './SearchField.styles';
import ImageLinks from '../../assets/images';
interface SearchFieldProps {
  placeholder: string;
  // onSearch: (searchTerm: string) => void;
  searchContainerCss?: ViewStyle;
}

const SearchField = ({ placeholder, searchContainerCss }: SearchFieldProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setSearchTerm(e.nativeEvent.text);
  };

  // const handleSubmit = () => {
  //   Keyboard.dismiss();
  //   onSearch(searchTerm);
  // };

  return (
    <View style={[styles.container, searchContainerCss]}>
      <View style={styles.spaceBetween}>
        <TextInput placeholder={placeholder} style={styles.input} />
        <Image source={ImageLinks.SEARCH_ICON} style={styles.searchIcon} />
      </View>
    </View>
  );
};

export default SearchField;
