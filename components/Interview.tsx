import React, { Component } from 'react';
import {
  Text,
  View,
  Pressable
} from 'react-native';

import 'react-native-gesture-handler';

import styles, {Context} from '../helpers/consts'
import { Interview, Metric } from '../helpers/Roles';
import { InterviewTask, MetricTask } from '../helpers/Tasks';

class Interviews extends Component {
    addMetric = (name: Interview) => {
        const task = new InterviewTask(this.context.taskManager.nextId, name)
        this.context.taskManager.addTask(task);
        this.context.addTask(task);
    }
    
    renderRow(name: Interview) {
        return (
            <Pressable style={({pressed}) => [
                    styles.button, styles.width300,
                    pressed ? styles.buttonBackgroundClick : (this.context.addedInterview ? styles.buttonBackgroundDisable : styles.buttonBackground)]}
                    disabled={this.context.addedInterview}
                    onPress={() => this.addMetric(name)}>
                <Text style={styles.buttonTextName}>{name}</Text>
                <Text style={styles.buttonTextCount}>{InterviewTask.prices[name]}$</Text>
                <Text style={styles.buttonTextCount}>2</Text>
                <Text style={styles.width30}>{this.context.addedInterview ? '✓' : ''}</Text>
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
                    <Text style={styles.sectionTitle}>Выбор типа опроса</Text>

                    <View style={styles.titles}>
                        <Text style={styles.buttonTextName}></Text>
                        <Text style={styles.buttonTextCount}>Цена</Text>
                        <Text style={styles.buttonTextCount}>sp</Text>
                        <Text style={styles.width30}></Text>
                    </View>
                    {this.renderRow(Interview.STANDARD)}
                </View>
            </View>
        );
    }
}
Interviews.contextType = Context;

export default Interviews;
