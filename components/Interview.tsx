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
    interview = {
        [Interview.STANDARD]: 100
    }

    addMetric = (name: Interview) => {
        this.context.changeMoney(-this.interview[name]);
        const task = new InterviewTask(this.context.taskManager.nextId, name)
        this.context.taskManager.addTask(task)
    }
    
    renderRow(name: Interview) {
        return (
            <Pressable style={({pressed}) => [
                    styles.button, styles.width300,
                    pressed ? styles.buttonBackgroundClick : styles.buttonBackground]}
                    onPress={() => this.addMetric(name)}>
                <Text style={styles.buttonTextName}>{name}</Text>
                <Text style={styles.buttonTextCount}>{this.interview[name]}$</Text>
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
                    <Text style={styles.sectionTitle}>Выбор типа опроса</Text>

                    <View style={styles.titles}>
                        <Text style={styles.buttonTextName}></Text>
                        <Text style={styles.buttonTextCount}>Цена</Text>
                    </View>
                    {this.renderRow(Interview.STANDARD)}
                </View>
            </View>
        );
    }
}
Interviews.contextType = Context;

export default Interviews;
