import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { COLOR_PALETTE } from '../../types/enums';
import { lineChartData } from '../../utils/data';
import styles from './LineChartGraph.styles';
import TextField from '../../components/TextField/TextField';
import { STRINGS } from '../../types/strings';

const LineChartGraph = () => {
  return (
    <View style={styles.container}>
      <TextField os={styles.headerFirst} text={STRINGS.FERMENTATION} />
      <TextField os={styles.headerSecond} text={`${STRINGS.CLASSIC} ${STRINGS.STRONG} ${STRINGS.LAGER}`} />
      <View style={styles.spaceBetween}>
        <View style={styles.verticalGraphTextContainer}>
          <TextField os={styles.verticalGraphText} text={STRINGS.BRIX} />
        </View>

        <LineChart
          data={lineChartData}
          xAxisLabel=" hr"
          width={Dimensions.get('window').width - 60}
          height={200}
          yAxisInterval={Infinity}
          chartConfig={{
            backgroundColor: COLOR_PALETTE.BLANCHED_ALMOND,
            backgroundGradientFrom: COLOR_PALETTE.SEASHELL,
            backgroundGradientTo: COLOR_PALETTE.SEASHELL,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForDots: {
              r: '0',
            },
            propsForBackgroundLines: {
              strokeDasharray: 'none',
            },
          }}
          bezier
        />
      </View>
      <TextField os={styles.horizontalGraphText} text={`${STRINGS.TIME}  (${STRINGS.HOURS})`} />
    </View>
  );
};

export default LineChartGraph;
