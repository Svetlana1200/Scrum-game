import React from 'react';
import {
    Text,
    View,
    Dimensions
} from 'react-native';
import styles, {Context} from '../helpers/consts'
import {LineChart} from "react-native-chart-kit";
import { Role } from '../helpers/Roles';

interface IProps {
    monthesforGrafic: string[];
    role: Role;
}

export class App extends React.Component<IProps> {
    render() {
        return (    
            <LineChart
                data={{
                    labels: this.props.monthesforGrafic,
                    datasets: [
                        {data: this.context.userStatistics[this.props.role]}
                    ]
                }}
                width={Dimensions.get("window").width}
                height={220}
                yAxisInterval={1}
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        )
    }
};
App.contextType = Context;

export default App;
