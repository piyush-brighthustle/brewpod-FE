import React, { useState, useMemo } from 'react';
import TextField from '../../components/TextField/TextField';
import { ImageBackground, StyleProp, TextInput, TouchableOpacity, View } from 'react-native';
import ImageLinks from '../../assets/images';
import { User } from '../../types/authTypes';
import styles from './ProfileCard.styles';
import { HomeScreenNavigationProp } from '../../screens/HomeScreen/HomeScreen';
import { STRINGS } from '../../types/strings';
import { scaleFont, scaleHeight } from '../../utils/scale';
import { TEXT_COLOR } from '../../types/enums';
import { Image } from 'react-native';
import { ViewStyle } from 'react-native-size-matters';
import { updateUsername } from '../../utils/user.helper';
import { useDispatch } from 'react-redux';

type ProfileCardProps = {
  user: User | null;
  navigation: HomeScreenNavigationProp;
};

type BrewLagerProps = {
  heading: string;
  text: string;
  badges?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

function ProfileCard({ user, navigation }: ProfileCardProps) {
  const [totalBrews, setTotalBrews] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [showMoreClicked, setShowMoreClicked] = useState(false);
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const backgroundImage = editMode ? ImageLinks.USER_PROFILE_CARD_EDIT_BACKGROUND : ImageLinks.USER_PROFILE_CARD_BACKGROUND;

  const AddPicture = () => (
    <TouchableOpacity style={styles.addPictureContainer}>
      <View style={styles.addPictureImageContainer}>
        <Image source={ImageLinks.CAMERA_ICON} tintColor={TEXT_COLOR.BLACK} style={styles.addPictureImage} />
      </View>
      <TextField text={`${STRINGS.ADD} ${STRINGS.PICTURE}`} fontSize={scaleFont(10)} os={styles.addPictureText} />
    </TouchableOpacity>
  );

  const EditButton = () => (
    <TouchableOpacity onPress={() => setEditMode(!editMode)}>
      <Image source={editMode ? ImageLinks.EDITING_ICON : ImageLinks.EDIT_ICON} style={editMode ? styles.renderEdittingButton : styles.renderEditButton} />
    </TouchableOpacity>
  );

  const BrewLagerRatingCard = ({ text, heading, badges, containerStyle }: BrewLagerProps) => (
    <View
      style={[
        {
          gap: 3,
          marginTop: badges ? 15 : null,
          marginRight: badges ? 'auto' : null,
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        containerStyle,
      ]}>
      <TextField text={heading} color={TEXT_COLOR.WHITE} fontSize={scaleFont(14)} fontWeight={600} />
      <TouchableOpacity style={styles.brewLagerContentContainer}>
        {badges ? (
          <View style={styles.brewLagerStarsContainer}>
            {[...Array(5)].map((_, index) => (
              <Image source={ImageLinks.STAR_ICON} key={index} tintColor={TEXT_COLOR.WHITE} />
            ))}
          </View>
        ) : (
          <>
            <TextField text={text} fontSize={scaleFont(20)} color={TEXT_COLOR.WHITE} fontWeight={400} />
            <Image source={ImageLinks.BEER_CUP_ICON} />
          </>
        )}
      </TouchableOpacity>
    </View>
  );

  const UserProfilePicture = () => {
    if (!user || !user.profile || !user.profile.url) {
      return null;
    }

    return (
      <View style={styles.userProfileContainer}>
        <Image
          source={{
            uri: user.profile.url,
          }}
          resizeMode="contain"
          style={{
            height: showMoreClicked ? scaleHeight(90) : scaleHeight(70),
            width: showMoreClicked ? scaleHeight(90) : scaleHeight(70),
            borderRadius: 100,
          }}
          onError={(error) => console.log('Failed to load image: ', error)}
        />
      </View>
    );
  };

  const CollapseProfileCard = () => (
    <TouchableOpacity style={styles.collapseProfileContainer} activeOpacity={0.5} onPress={() => setShowMoreClicked(!showMoreClicked)}>
      <TextField text={showMoreClicked ? 'Show Less' : 'Show More'} fontSize={scaleFont(14)} color={TEXT_COLOR.WHITE} />
      {
        <Image
          source={ImageLinks.ARROW_DOWN}
          style={{
            height: 10,
            width: 10,
            transform: [{ rotate: showMoreClicked ? '180deg' : '0deg' }],
            marginTop: showMoreClicked ? 4 : 0,
          }}
        />
      }
    </TouchableOpacity>
  );

  const handleUpdateUserName = async (username: string) => {
    if (user) {
      await updateUsername(username, user, dispatch);
    }
  };

  return (
    <View style={styles.imageBackgroundContainer}>
      {user ? (
        <ImageBackground
          source={backgroundImage}
          style={{
            position: 'relative',
          }}
          resizeMode="stretch">
          <View style={styles.imageBackground}>
            {/* Top Line (Name, Edit) */}
            <View style={styles.profileCardTop}>
              {editMode ? (
                <TextInput
                  onEndEditing={(e) => handleUpdateUserName(e.nativeEvent.text)}
                  defaultValue={username ? username : user.name}
                  onChangeText={(text) => setUsername(text)}
                  style={styles.profileCardTopInput}
                />
              ) : (
                <TextField text={username ? username : user.name} fontSize={scaleFont(24)} fontWeight={600} color={TEXT_COLOR.WHITE} os={styles.profileCardTopField} />
              )}
              <EditButton />
            </View>

            {/* Boxes */}
            <View style={styles.lagerCardsContainer}>
              <BrewLagerRatingCard heading={STRINGS.TOTAL_BREWS} text={`${totalBrews} ${STRINGS.BREWS}`} />
              {showMoreClicked && <BrewLagerRatingCard heading={STRINGS.FAVORITE_STYLE} text={STRINGS.LAGERS} />}
            </View>

            {showMoreClicked && <BrewLagerRatingCard heading={STRINGS.BADGES_COLLECTED} text={STRINGS.LAGERS} badges />}

            {editMode ? <AddPicture /> : <UserProfilePicture />}
          </View>

          <CollapseProfileCard />
        </ImageBackground>
      ) : (
        <ImageBackground source={ImageLinks.PROFILE_CARD_BACKGROUND} style={styles.imageBackground} resizeMode="cover">
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <TextField text={STRINGS.CREATE_PROFILE} os={styles.notLoggedContainer} />
          </TouchableOpacity>
        </ImageBackground>
      )}
    </View>
  );
}

export default ProfileCard;
