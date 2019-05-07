import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { max, isEmpty } from 'lodash';

const getTooltipMessage = (songsAmount) => {
  const messages = {
    0: 'There are no songs in this timeframe range.',
    1: 'There is 1 song in this timeframe range.',
    default: `There are ${songsAmount} songs in this timeframe range.`,
  };
  return messages[songsAmount] || messages.default;
};

const getHistoData = (histogramInfo) => {
  if (isEmpty(histogramInfo)) {
    return [];
  }
  const values = Object.values(histogramInfo).reduce((acc, el) => {
    const frame = Math.floor(el / 33);
    const count = acc[frame] || 0;
    return { ...acc, [frame]: count + 1 };
  }, {});
  const maximumKey = max(Object.keys(values));
  const emptyArray = [...Array(Number(maximumKey))];
  return emptyArray.map((el, i) => values[i + 1] || 0);
};

const getOptions = data => ({
  title: {
    text: 'Histogram (Frequency Diagram)',
  },
  chart: {
    type: 'column',
  },
  plotOptions: {
    column: {
      pointPlacement: 'between',
      dataLabels: {
        enabled: true,
      },
      pointPadding: 0,
      borderWidth: 0,
      groupPadding: 0,
    },
  },
  yAxis: {
    title: {
      text: 'Frequency',
    },
  },
  tooltip: {
    formatter() {
      return getTooltipMessage(this.y);
    },
  },
  xAxis: {
    labels: {
      formatter() {
        return this.value * 38;
      },
    },
    endOnTick: true,
  },
  series: [{
    name: 'Tracks',
    data,
  }],
});

const Histogram = (props) => {
  const { histogramInfo } = props;
  const data = getHistoData(histogramInfo);
  const options = getOptions(data);

  return (
    <div className="col-6 offset-md-1">
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
};

export default Histogram;
