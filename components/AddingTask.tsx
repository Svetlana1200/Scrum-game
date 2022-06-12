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
import { features, results, SimpleTask } from '../helpers/Tasks';

interface IProps {
    modalVisible: boolean;
    closeModal: Function
}

interface IState {
    role: ValueType|null;
    action: ValueType|null;
    result: ValueType|null;
    openRole: boolean;
    openAction: boolean;
    openResult: boolean;
    hasError: boolean;
}

export class AddingTask extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            role: null,
            action: null,
            result: null,
            openRole: false,
            openAction: false,
            openResult: false,
            hasError: false,
        }
    }

    addTask = () => {
        const {role, action, result} = this.state
        if (role && action && result) {
            const newTask: SimpleTask = new SimpleTask(this.context.taskManager.nextId, role as Role, features[action as string], results[result as string])

            this.context.taskManager.addTask(newTask);
            this.context.removeSelectedFeatureAndResult(action as string, result as string)
            this.props.closeModal()
            this.setState({
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.modalVisible}
                onRequestClose={() => this.props.closeModal()}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={[styles.headerAddingTasks]}>
                            <Text style={styles.sectionTitle}>Новая задача</Text>
                            <Pressable
                                style={[]}
                                onPress={() => this.props.closeModal()}
                                >
                                <Text style={styles.standartText}>X</Text>
                            </Pressable>
                        </View>
                        <Text style={[styles.standartText]}>Для получения новых вариантов выбора необходимо проводить опросы</Text>
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
                                items={this.getItems(this.context.possibleFeatures)}
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
        )
    }
}

AddingTask.contextType = Context;
export default AddingTask;