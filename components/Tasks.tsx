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
import GameOverModal from './GameOverModal';

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

    toResults = (task: BaseTask) => {
        if (task instanceof SimpleTask) {
            this.props.navigation.navigate('SimpleResults', {task: task})
        }
        else if (task instanceof MetricTask) {
            this.props.navigation.navigate('MetricResults', {task: task})
        }
        else if (task instanceof AdvertisingTask) {
            this.props.navigation.navigate('AdvertisingResults', {task: task})
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
                <Text style={[styles.standartText, styles.width50]}>{task.status === Status.COMPLETED ? task?.profitUsers || '-' : '-'}</Text>
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
                        <Text style={[styles.standartText, styles.width50]}>нов.</Text>
                        <Text style={[styles.standartText, styles.width50]}>польз.</Text>
                    </View>
                    <Text style={[styles.standartText, styles.width30]}></Text>
                </View>
                {this.context.taskManager.tasks.map((task: BaseTask) => this.renderTask(task))}
            </ScrollView>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <GameOverModal navigation={this.props.navigation}/>
                <View style={styles.header}>
                    <Text style={styles.standartText}>Спринт №{this.context.sprint}</Text>
                    <Text style={styles.standartText}>{this.context.money}$</Text>
                </View>    
                <View style={styles.sectionContainer}>
                    <AddingTask closeModal={() => this.setState({modalVisible: false})} modalVisible={this.state.modalVisible}/>
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
                    <Text style={styles.standartText}>Добавлено на {this.context.taskManager.getAddedSP()} sp</Text> 
                    {this.renderTasks()}
                </View>
            </View>
        );
    }
}
Tasks.contextType = Context;

export default Tasks;
