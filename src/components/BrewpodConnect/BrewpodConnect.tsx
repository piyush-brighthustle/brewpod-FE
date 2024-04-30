import TextField from '../../components/TextField/TextField';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './BrewpodConnect.styles';
import TextOnImageCard from '../../components/TextOnImageCard/TextOnImageCard';
import ImageLinks from '../../assets/images';
import { COLOR_PALETTE } from '../../types/enums';
import { STRINGS } from '../../types/strings';

type BrewpodConnectProps = {
  brewpodConnect: boolean;
  multiple: boolean;
};

const BrewpodConnect: React.FC<BrewpodConnectProps> = ({ brewpodConnect, multiple }) => {
  return (
    <>
      {brewpodConnect ? (
        <View>
          <TextField text={`${STRINGS.DEVICE} ${STRINGS.STATUS}`} os={styles.boldHeader} />
          <View style={styles.brewPodContainer}>
            <TouchableOpacity>
              <LinearGradient colors={[COLOR_PALETTE.JUNGLE_GREEN, COLOR_PALETTE.GREENISH_TEAL]} style={styles.deviceButton}>
                <TextField text={STRINGS.BREWPOD} os={styles.deviceButton1Text1} />
                <TextField text={STRINGS.ONLINE} os={styles.deviceButton1Text2} />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.deviceButton2}>
                <TextField text={STRINGS.FLOATY} os={styles.deviceButton2Text1} />
                <TextField text={STRINGS.OFFLINE} os={styles.deviceButton2Text2} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TextOnImageCard
          backgroundImage={ImageLinks.BREWPODCONNECT_BACKGROUND_IMAGE}
          backgroundImageTwo={ImageLinks.BREWPODCONNECT_BLUR_BACKGROUND_IMAGE}
          textOne={`${STRINGS.CONNECT} ${STRINGS.TO} ${STRINGS.YOUR}`}
          textTwo={STRINGS.BREWPOD}
          to="BrewPodConnect"
        />
      )}
    </>
  );
};

export default BrewpodConnect;
