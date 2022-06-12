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
    render() {
        const sprints = [];
        for (let i = 0; i < this.context.sprint; i++) {
            sprints.push(String(i))
        }
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.standartText}>Спринт №{this.context.sprint}</Text>
                    <Text style={styles.standartText}>Пользователи: {this.context.userStatistics[this.context.userStatistics.length - 1] * 100}</Text>
                    <Text style={styles.standartText}>{this.context.money}$</Text>
                </View>
                <ScrollView>
                    <View>
                        <Text style={[styles.standartText]}>График изменения кол-ва пользователей</Text>
                        <UserStatistic numberSprints={sprints} values={this.context.userStatistics.map(value => value * 100)}/>
                        <Text style={[styles.standartText]}>График метрики ARPU. Для обновления данных необходимо составить метрику ARPU</Text>
                        <UserStatistic numberSprints={sprints} values={this.context.ARPUStatistics}/>
                        <Text style={[styles.standartText]}>График метрики Retation rate. Для обновления данных необходимо составить метрику Retation rate</Text>
                        <UserStatistic numberSprints={sprints} values={this.context.RRStatistics}/>
                    </View>
                </ScrollView>
            </View>
        )
    }
};
Product.contextType = Context;

export default Product;
