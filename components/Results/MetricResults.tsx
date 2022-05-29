import React, {Component} from 'react';
import {
  Text,
  View,
  Pressable,
  Alert,
  Dimensions
} from 'react-native';
import styles, {Context} from '../../helpers/consts'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

export class App extends React.Component {
    render() {
        return (
            <Text>Text</Text>
        )
    }
};
App.contextType = Context;

export default App;
