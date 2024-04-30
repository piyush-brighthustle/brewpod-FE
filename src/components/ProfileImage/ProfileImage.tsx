import React, { useState } from 'react';
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native';
import styles from './ProfileImage.styles';
import ImageLinks from '../../assets/images';
import { selectUser } from '../../slices/userSlice';
import { useSelector } from 'react-redux';

type ProfileImageProps = {
  editing: boolean;
};

const ProfileImage: React.FC<ProfileImageProps> = ({ editing }) => {
  const user = useSelector(selectUser);
  return (
    <View style={styles.container}>
      {editing && (
        <View>
          <TouchableOpacity>
            <View style={styles.camera}>
              <Image source={ImageLinks.CAMERA_ICON} />
            </View>
            <Text style={styles.iconText}>Change{'\n'} Picture</Text>
          </TouchableOpacity>
          <Image source={{ uri: user?.profile.url }} style={styles.image} />
        </View>
      )}
      <TouchableOpacity>
        <Image source={{ uri: user?.profile.url }} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileImage;
