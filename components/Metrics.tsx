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

interface IProps {}
interface IState {
    text: string;
    monthesCount: string
}

class Metrics extends Component<IProps, IState> {
    metrics = {
        [Metric.ARPU]: {price: 100},
        [Metric.RR]: {price: 150}
    }
    constructor(props: IProps) {
        super(props);
        this.state = {
            text: '1',
            monthesCount: '1'
        };
    }
    
    handleInputChange = (text: string) => {
        this.setState({text: text.replace(/[^0-9]/g, '')});
    }
    handleInputEndEditing = () => {
        this.setState({monthesCount: this.state.text})
        Object.keys(this.metrics).map((metric) => {
            this.metrics[metric as Metric].price *= Number(this.state.text);
        })
    }

    addMetric = (name: Metric) => {
        this.context.changeMoney(-this.metrics[name].price);
        const task = new MetricTask(this.context.taskManager.nextId, 1, this.context.dateDate, Number(this.state.monthesCount), name)
        this.context.taskManager.addTask(task)
    }
    
    renderRow(name: Metric) {
        return (
            <Pressable style={({pressed}) => [
                    styles.button, styles.width300,
                    pressed ? styles.buttonBackgroundClick : styles.buttonBackground]}
                    onPress={() => this.addMetric(name)}>
                <Text style={styles.buttonTextName}>{name}</Text>
                <Text style={styles.buttonTextTime}>{this.state.monthesCount} месяц</Text>
                <Text style={styles.buttonTextCount}>{this.metrics[name].price}$</Text>
            </Pressable>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.standartText}>{this.context.date}</Text>
                    <Text style={styles.standartText}>{this.context.money}$</Text>
                </View>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Выбор метрики</Text>
                    <Text style={styles.standartText}>ARPU - средний доход</Text>
                    <Text style={styles.standartText}>Retation Rate -  коэффициент удержания клиентов</Text>
                    <View style={styles.row}>
                        <Text style={styles.standartText}>Введите срок:</Text>
                        <TextInput
                            style={[styles.standartText, styles.standartInput]}
                            keyboardType='numeric'
                            onChangeText={this.handleInputChange}
                            onEndEditing={this.handleInputEndEditing}
                            value={this.state.text}/>
                        <Text style={styles.standartText}>месяц</Text>
                    </View>

                    <View style={styles.titles}>
                        <Text style={styles.buttonTextName}></Text>
                        <Text style={styles.buttonTextTime}>Срок</Text>
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
