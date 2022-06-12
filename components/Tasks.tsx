import React, { Component} from 'react';
import {
  Text,
  View,
  Modal,
  Pressable,
  ScrollView
} from 'react-native';
import DropDownPicker, {ValueType} from 'react-native-dropdown-picker';

import 'react-native-gesture-handler';
import styles, {Context} from '../helpers/consts'
import {Role, Status} from '../helpers/Roles'
import { AdvertisingTask, BaseTask, MetricTask, SimpleTask, results, features } from '../helpers/Tasks';
import { AddingTask } from './AddingTask';

interface IProps {
    navigation: {
        navigate: Function;
    }
}

interface IState {
    modalVisible: boolean;
    rerenderFlag: boolean;
}

class Tasks extends Component<IProps, IState> {
    tasks: BaseTask[] = [];
    constructor(props: IProps) {
        super(props);
        this.state = {
            rerenderFlag: true,
            modalVisible: false
        }
    }


    addAndRemoveToSprint(task: BaseTask) {
        if (task.inCurrentSprint) {
            this.context.taskManager.removeFromSprint(task)
        }
        else {
            this.context.taskManager.addToSprint(task)
        }
        task.inCurrentSprint = !task.inCurrentSprint
        this.setState({rerenderFlag: !this.state.rerenderFlag})
    }

    _getSP(task: BaseTask) {
        if (task.status === Status.STARTED && !(task instanceof AdvertisingTask)) {
            return Math.ceil(task.measuredCost / 2)
        }
        if (task.status === Status.COMPLETED) {
            return task.realCost
        }
        return task.measuredCost
    }

    renderTask(task: BaseTask) {
        return (
            <View key={task.id} style={[styles.row, styles.border]}>
                <Text style={[styles.standartText, styles.width]}>{task.description}</Text>
                <Text style={[styles.standartText, styles.width50]}>{task.status}</Text>
                <Text style={[styles.standartText, styles.width30]}>{this._getSP(task)}</Text>
                {
                    task.status !== Status.COMPLETED &&
                        <Pressable style={({pressed}) => [
                                        styles.button, styles.width30,
                                        pressed ? styles.buttonBackgroundClick : (
                                            task.status === Status.STARTED && !task.canRemove ? styles.buttonBackgroundDisable : styles.buttonBackground)
                                    ]}
                                    onPress={() => this.addAndRemoveToSprint(task)}
                                    disabled={task.status === Status.STARTED && !task.canRemove}>
                                        {
                                            task.inCurrentSprint ? 
                                                <Text style={styles.standartText}>-</Text>:
                                                <Text style={styles.standartText}>+</Text>
                                        }
                        </Pressable>
                }
            </View>
        )
    }

    renderTasks() {
        return (
            <ScrollView>
                <View style={styles.row}>
                    <Text style={[styles.standartText, styles.width]}></Text>
                    <Text style={[styles.standartText, styles.width50]}>Статус</Text>
                    <Text style={[styles.standartText, styles.width30]}>sp</Text>
                    <View>
                        <Text style={[styles.standartText, styles.width90]}>Добавить</Text>
                        <Text style={[styles.standartText, styles.width90]}>в спринт</Text>
                    </View>
                </View>
                {this.context.taskManager.tasks.map((task: BaseTask) => this.renderTask(task))}
            </ScrollView>
        )
    }

    render() {
        const {sp, money} = this.context.taskManager.getAddedResources()

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.standartText}>Спринт №{this.context.sprint}</Text>
                    <Text style={styles.standartText}>Пользователи: {this.context.userStatistics[this.context.userStatistics.length - 1] * 100}</Text>
                    <Text style={styles.standartText}>{this.context.money}$</Text>
                </View>    
                <View style={styles.sectionContainer}>
                    <AddingTask closeModal={() => this.setState({modalVisible: false})} modalVisible={this.state.modalVisible}/>
                    <Text style={styles.standartText}>Производительность команды 10 sp. В задачах указано измеренное кол-во sp, оно может отличаться от реального.</Text>
                    <Pressable style={({pressed}) => [
                                    styles.button, styles.width300,
                                    pressed ? styles.buttonBackgroundClick : styles.buttonBackground]}
                                onPress={() => this.props.navigation.navigate('Sprint', {isNext: false})}>
                        <Text style={styles.buttonText}>Предыдущий спринт</Text>
                    </Pressable>
                    <Pressable style={({pressed}) => [
                                    styles.button, styles.width300,
                                    pressed ? styles.buttonBackgroundClick : styles.buttonBackground]}
                                onPress={() => this.props.navigation.navigate('Sprint', {isNext: true})}>
                        <Text style={styles.buttonText}>Следующий спринт</Text>
                    </Pressable>
                    <Pressable style={({pressed}) => [
                                    styles.button, styles.width300,
                                    pressed ? styles.buttonBackgroundClick : styles.buttonBackground]}
                                onPress={() => this.setState({modalVisible: true})}>
                        <Text style={styles.buttonText}>Добавить задачу</Text>
                    </Pressable>
                    <Text style={styles.standartText}>Добавлено на {sp} sp</Text> 
                    <Text style={styles.standartText}>Будет потрачено {this.context.sprintCost + money}$</Text> 
                    {this.renderTasks()}
                </View>
            </View>
        );
    }
}
Tasks.contextType = Context;

export default Tasks;
