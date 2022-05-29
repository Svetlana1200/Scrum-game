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
import {Role} from '../helpers/Roles'
import { AdvertisingTask, BaseTask, MetricTask, SimpleTask } from '../helpers/Tasks';

interface IProps {
    navigation: {
        navigate: Function;
    }
}

interface IState {
    modalVisible: boolean;
    role: ValueType|null;
    action: ValueType|null;
    result: ValueType|null;
    openRole: boolean;
    openAction: boolean;
    openResult: boolean;
    hasError: boolean;
}

class Tasks extends Component<IProps, IState> {
    tasks: BaseTask[] = [];
    finishTasks: BaseTask[] = [];
    constructor(props: IProps) {
        super(props);
        this.state = {
            modalVisible: false,
            role: null,
            action: null,
            result: null,
            openRole: false,
            openAction: false,
            openResult: false,
            hasError: false,
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

    renderTask(task: BaseTask, isFinish: boolean) {
        return (
            <View key={task.id} style={[styles.row, styles.border]}>
                <Text style={[styles.standartText, styles.width]}>{task.description}</Text>
                {
                    isFinish ?
                        <Pressable onPress={() => this.toResults(task)}>
                            <Text style={styles.standartText}>Готово</Text>
                        </Pressable> :
                        <Text style={styles.standartText}>{task.finishDate.getDate()}.{task.finishDate.getMonth()}.{task.finishDate.getFullYear()}</Text>
                }
            </View>
        )
    }

    renderTasks() {
        return (
            <ScrollView>
                <View style={styles.row}>
                    <Text style={[styles.standartText, styles.width]}></Text>
                    <Text style={styles.standartText}>Срок</Text>
                </View>
                {this.context.taskManager.finishTasks.map((task: BaseTask) => this.renderTask(task, true))}
                {this.context.taskManager.tasks.map((task: BaseTask) => this.renderTask(task, false))}
            </ScrollView>
        )
    }

    addTask = () => {
        const {role, action, result} = this.state
        if (role && action && result) {
            const time = Math.floor(Math.random() * 3) + 1; // 1, 2 или 3 месяца
            const coefUsers = 2//Math.random()
            const coefIncome = 2//Math.random()
            const newTask: SimpleTask = new SimpleTask(this.context.taskManager.tasks.nextId, time, this.context.dateDate, role as Role, action as string, result as string, coefUsers, coefIncome)
            
            this.context.taskManager.addTask(newTask)
            this.setState({
                modalVisible: false,
                role: null,
                action: null,
                result: null,
                openRole: false,
                openAction: false,
                openResult: false,
                hasError: false
            })
        }
        else {
            this.setState({
                hasError: true
            })
        }
    }

    getItems(array: string[]) {
        const items: object[] = [];
        array.forEach((item) => {
            items.push({label: item, value: item})
        })
        return items
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.standartText}>{this.context.date}</Text>
                    <Text style={styles.standartText}>{this.context.money}$</Text>
                </View>    
                <View style={styles.sectionContainer}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.setState({modalVisible: false})
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.sectionTitle}>Новая задача</Text>
                                <Pressable
                                    style={[]}
                                    onPress={() => this.setState({modalVisible: false})}
                                    >
                                    <Text style={styles.standartText}>Закрыть</Text>
                                </Pressable>
                                <View style={styles.stringBlock}>
                                    <Text style={[styles.standartText, styles.itemBlock]}>Как</Text>
                                    <DropDownPicker
                                        containerStyle={[styles.roleSelector, styles.itemBlock]}
                                        zIndex={3000}
                                        zIndexInverse={1000}
                                        open={this.state.openRole}
                                        value={this.state.role}
                                        items={[
                                            {label: 'модератор', value: Role.MODERATOR},
                                            {label: 'слушатель', value: Role.LISTENER},
                                            {label: 'автор', value: Role.AUTHOR}
                                        ]}
                                        setOpen={() => this.setState({
                                            openRole: !this.state.openRole,
                                            openAction: false,
                                            openResult: false
                                        })}
                                        setValue={(callback) => {
                                            this.setState(state => ({
                                                role: callback(state.role)
                                            }));
                                        }}
                                    />
                                    <Text style={styles.standartText}>, я хочу</Text>
                                </View>
                                <View style={styles.stringBlock}>
                                    <DropDownPicker
                                        containerStyle={[styles.itemBlock]}
                                        zIndex={2000}
                                        zIndexInverse={2000}
                                        open={this.state.openAction}
                                        value={this.state.action}
                                        items={this.getItems(this.context.possibleActions)}
                                        setOpen={() => this.setState({
                                            openAction: !this.state.openAction,
                                            openResult: false,
                                            openRole: false
                                        })}
                                        setValue={(callback) => {
                                            this.setState(state => ({
                                                action: callback(state.action)
                                            }));
                                        }}
                                    />
                                    <Text style={styles.standartText}>,</Text>
                                </View>
                                <View style={styles.stringBlock}>
                                    <Text style={styles.standartText}>чтобы</Text>
                                </View>
                                <View style={styles.stringBlock}>
                                    <DropDownPicker
                                        zIndex={1000}
                                        zIndexInverse={3000}
                                        open={this.state.openResult}
                                        value={this.state.result}
                                        items={this.getItems(this.context.possibleResults)}
                                        setOpen={() => this.setState({
                                            openResult: !this.state.openResult,
                                            openAction: false,
                                            openRole: false
                                        })}
                                        setValue={(callback) => {
                                            this.setState(state => ({
                                                result: callback(state.result)
                                            }));
                                        }}
                                    />
                                </View>
                                <Pressable style={({pressed}) => [
                                                styles.button, styles.width300,
                                                pressed ? styles.buttonBackgroundClick : styles.buttonBackground]}
                                            onPress={this.addTask}>
                                    <Text style={styles.buttonText}>Добавить</Text>
                                </Pressable>
                                {this.state.hasError && <Text style={styles.errorText}>Нужно заполнить все поля</Text>}
                            </View>
                        </View>
                    </Modal>
                    <Pressable style={({pressed}) => [
                                    styles.button, styles.width300,
                                    pressed ? styles.buttonBackgroundClick : styles.buttonBackground]}
                                onPress={() => this.setState({modalVisible: true})}>
                        <Text style={styles.buttonText}>Добавить задачу</Text>
                    </Pressable>
                    {this.renderTasks()}
                </View>
            </View>
        );
    }
}
Tasks.contextType = Context;

export default Tasks;
