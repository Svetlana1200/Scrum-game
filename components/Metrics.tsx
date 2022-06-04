import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  Pressable
} from 'react-native';

import 'react-native-gesture-handler';

import styles, {Context} from '../helpers/consts'
import { Metric } from '../helpers/Roles';
import { MetricTask } from '../helpers/Tasks';

class Metrics extends Component {
    metrics = {
        [Metric.ARPU]: {price: 100},
        [Metric.RR]: {price: 150}
    }

    addMetric = (name: Metric) => {
        this.context.changeMoney(-this.metrics[name].price);
        const task = new MetricTask(this.context.taskManager.nextId, name)
        this.context.taskManager.addTask(task)
    }
    
    renderRow(name: Metric) {
        return (
            <Pressable style={({pressed}) => [
                    styles.button, styles.width300,
                    pressed ? styles.buttonBackgroundClick : styles.buttonBackground]}
                    onPress={() => this.addMetric(name)}>
                <Text style={styles.buttonTextName}>{name}</Text>
                <Text style={styles.buttonTextCount}>{this.metrics[name].price}$</Text>
            </Pressable>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.standartText}>Спринт №{this.context.sprint}</Text>
                    <Text style={styles.standartText}>{this.context.money}$</Text>
                </View>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Выбор метрики</Text>
                    <Text style={styles.standartText}>ARPU - средний доход</Text>
                    <Text style={styles.standartText}>Retation Rate -  коэффициент удержания клиентов</Text>

                    <View style={styles.titles}>
                        <Text style={styles.buttonTextName}></Text>
                        <Text style={styles.buttonTextCount}>Цена</Text>
                    </View>
                    {this.renderRow(Metric.ARPU)}
                    {this.renderRow(Metric.RR)}
                </View>
            </View>
        );
    }
}
Metrics.contextType = Context;

export default Metrics;
