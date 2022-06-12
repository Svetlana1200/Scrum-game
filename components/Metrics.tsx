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
    addMetric = (name: Metric) => {
        const task = new MetricTask(this.context.taskManager.nextId, name)
        this.context.taskManager.addTask(task);
        this.context.addTask(task);
    }
    
    renderRow(name: Metric) {
        let disabled = false;
        if (name === Metric.ARPU) {
            disabled = this.context.addedMetricARPU
        }
        else if (name === Metric.RR) {
            disabled = this.context.addedMetricRR
        }
        return (
            <Pressable style={({pressed}) => [
                    styles.button, styles.width300,
                    pressed ? styles.buttonBackgroundClick : (disabled ? styles.buttonBackgroundDisable : styles.buttonBackground)]}
                    disabled={disabled}
                    onPress={() => this.addMetric(name)}>
                <Text style={styles.buttonTextName}>{name}</Text>
                <Text style={styles.buttonTextCount}>{MetricTask.prices[name]}$</Text>
                <Text style={styles.buttonTextCount}>1</Text>
                <Text style={styles.width30}>{disabled ? '✓' : ''}</Text>
            </Pressable>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.standartText}>Спринт №{this.context.sprint}</Text>
                    <Text style={styles.standartText}>Пользователи: {this.context.userStatistics[this.context.userStatistics.length - 1] * 100}</Text>
                    <Text style={styles.standartText}>{this.context.money}$</Text>
                </View>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Выбор метрики</Text>
                    <Text style={styles.standartText}>ARPU - средний доход</Text>
                    <Text style={styles.standartText}>Retation Rate -  коэффициент удержания клиентов</Text>

                    <View style={styles.titles}>
                        <Text style={styles.buttonTextName}></Text>
                        <Text style={styles.buttonTextCount}>Цена</Text>
                        <Text style={styles.buttonTextCount}>sp</Text>
                        <Text style={styles.width30}></Text>
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
