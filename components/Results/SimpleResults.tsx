import React, {Component} from 'react';
import {
  Text,
  View
} from 'react-native';
import styles, {Context} from '../../helpers/consts'
import { SimpleTask } from '../../helpers/Tasks';

export class App extends React.Component {
    render() {
        const task: SimpleTask = this.props.route.params.task
        return (
            <View>
                <Text style={styles.standartText}>Было привлечено {task.resultTask.users} {task.role}</Text>
                <Text style={styles.standartText}>Получено денег {task.resultTask.money}$</Text>
            </View>    
        )
    }
};
App.contextType = Context;

export default App;
