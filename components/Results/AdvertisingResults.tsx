import React, {Component} from 'react';
import {
  Text,
  View
} from 'react-native';
import styles, {Context} from '../../helpers/consts'
import { Role } from '../../helpers/Roles';
import { AdvertisingTask, SimpleTask } from '../../helpers/Tasks';

export class App extends React.Component {
    render() {
        const task: AdvertisingTask = this.props.route.params.task
        return (
            <View>
                <Text style={styles.standartText}>Было привлечено:</Text>
                {
                    Object.keys(task.resultTask).map((role) => 
                        <Text style={styles.standartText}>{task.resultTask[role as Role]} {role}</Text>
                    )
                }
            </View>    
        )
    }
};
App.contextType = Context;

export default App;
