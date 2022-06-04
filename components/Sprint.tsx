import React from 'react';
import {
  Text,
  View,
  ScrollView,
  Pressable
} from 'react-native';
import styles, {Context} from '../helpers/consts'
import { BaseTask, SimpleTask } from '../helpers/Tasks';
import Header from './Header';

interface IProps {
    route: {
        params: {
            isNext: boolean;
        }
    };
    navigation: {
        navigate: Function;
    }
}

export class Sprint extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props)
        this.props.navigation.setOptions({ 
            headerTitle: (props: IProps) => <Header {...props}
                title={this.props.route.params.isNext ? 'Следующий спринт' : 'Предыдущий спринт'}/>
        })
    }

    _getStatus(task: BaseTask) {
        if (this.props.route.params.isNext)
            return 'Планируется'
        return task.status
    }

    renderTask(task: BaseTask) {
        return (
            <View key={task.id} style={[styles.row, styles.border]}>
                <Text style={[styles.standartText, styles.width]}>{task.description}</Text>
                <Text style={styles.standartText}>{this._getStatus(task)}</Text>
            </View>
        )
    }

    render() {
        const tasks = this.props.route.params.isNext ? this.context.taskManager.nextSprintTasks : this.context.taskManager.prevSprintTasks
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.standartText}>Спринт №{this.context.sprint}</Text>
                    <Text style={styles.standartText}>{this.context.money}$</Text>
                </View>
                <ScrollView>
                    {
                        this.props.route.params.isNext &&
                        <Pressable style={({pressed}) => [
                                            styles.button, styles.width300,
                                            pressed ? styles.buttonBackgroundClick : styles.buttonBackground]}
                                        onPress={() => {
                                            this.context.startSprint()
                                            this.props.navigation.navigate('Tasks')
                                        }}>
                                <Text style={styles.buttonText}>Выполнить спринт</Text>
                        </Pressable>
                    }
                    <View style={styles.row}>
                        <Text style={[styles.standartText, styles.width]}></Text>
                        <Text style={styles.standartText}>Статус</Text>
                    </View>
                    {tasks.map((task: SimpleTask) => this.renderTask(task))}
                </ScrollView>
            </View>
        )
    }
};
Sprint.contextType = Context;

export default Sprint;
