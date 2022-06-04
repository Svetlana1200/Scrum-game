import React from 'react';
import {
    Text,
    View,
    ScrollView
} from 'react-native';
import styles, {Context} from '../helpers/consts'
import UserStatistic from './UserStatistic';

interface IProps {
    navigation: {
        navigate: Function
    }
}

export class Product extends React.Component<IProps> {
    renderRow(text1: string, text2: string) {
        return (
        <View style={[styles.row, styles.offset]}>
            <Text style={[styles.standartText, styles.width120]}>{text1}</Text>
            <Text style={[styles.standartText, styles.width90]}>{text2}</Text>
        </View>
        )
    }

    render() {
        const sprints = [];
        for (let i = 0; i < this.context.sprint; i++) {
            sprints.push(String(i))
        }
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.standartText}>Спринт №{this.context.sprint}</Text>
                    <Text style={styles.standartText}>{this.context.money}$</Text>
                </View>
                <ScrollView>
                    <View style={styles.sectionContainer}>
                        {this.renderRow('Пользователи', this.context.userStatistics.slice(-1))}
                    </View>
                    <View>
                        <UserStatistic numberSprints={sprints} values={this.context.userStatistics}/>
                        <UserStatistic numberSprints={sprints} values={this.context.ARPUStatistics}/>
                        <UserStatistic numberSprints={sprints} values={this.context.RRStatistics}/>
                    </View>
                </ScrollView>
            </View>
        )
    }
};
Product.contextType = Context;

export default Product;
