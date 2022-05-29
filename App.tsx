/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Alert, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainMenu from './components/MainMenu';
import Actions from './components/Actions';
import Advertising from './components/Advertising'
import Metrics from './components/Metrics'
import Tasks from './components/Tasks'
import Product from './components/Product'
import Users from './components/Users'
import MetricResults from './components/Results/MetricResults'
import SimpleResults from './components/Results/SimpleResults'
import AdvertisingResults from './components/Results/AdvertisingResults'
import {Context} from './helpers/consts'
import {Role} from './helpers/Roles'
import { TaskManager } from './helpers/TaskManager';
import { AdvertisingTask, BaseTask, MetricTask, SimpleTask } from './helpers/Tasks';
import { Advertising as AdvertisingType} from './helpers/Roles';

const Stack = createStackNavigator();

/*const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};*/

interface IState {
    money: number;
    date: Date;
    dateStr: string;
    isStart: boolean;
    possibleActions: string[];
    possibleResults: string[];
    users: {[key: string]: UsersCount};
    userStatistics: {[key: string]: number[]};
}
type UsersCount = {
    all: number;
    subscription: number;
}

export class App extends React.Component<{}, IState> {
    private timerID?: Timer;

    taskManager: TaskManager
    //const isDarkMode = useColorScheme() === 'dark';
    
    //const backgroundStyle = {
    //    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    //};
    constructor(props: {}) {
        super(props)
        this.taskManager = new TaskManager([])
        this.taskManager.addTask(new SimpleTask(1, 1, new Date(2020, 0, 1), Role.LISTENER, 'кнопку паузы', 'останавливать прослушивание музыки', 2, 2));
        this.taskManager.addTask(new SimpleTask(2, 2, new Date(2020, 0, 1), Role.AUTHOR, 'кнопку прогресс бар', 'видеть сколько будет загружаться песня', 2, 2));
        //this.taskManager.addTask(new MetricTask(3, 4, new Date(2020, 0, 1), 2, Metric.ARPU));
        //this.taskManager.addTask(new MetricTask(4, 3, new Date(2020, 0, 1), 2, Metric.ARPU));
        this.state = {
            money: 10000,
            date: new Date(2020, 0, 1),
            dateStr: '1 Января 2020',
            isStart: false,
            possibleActions: ['действие1', 'действие2', 'действие3'],
            possibleResults: ['результат1', 'результат2', 'результат3'],
            users: {
                [Role.LISTENER]: {all: 30, subscription: 20},
                [Role.AUTHOR]: {all: 3, subscription: 2},
                [Role.MODERATOR]: {all: 9, subscription: 4}
            },
            userStatistics: {
                [Role.LISTENER]: [30, 30, 30, 30, 30],
                [Role.AUTHOR]: [4, 4, 4, 4, 4],
                [Role.MODERATOR]: [9, 9, 9, 9, 9]
            }
        }
    }
    componentWillUnmount() {
        if (this.timerID) 
            clearInterval(this.timerID);
    }
    changeMoney = (count: number) => {
        const money = this.state.money
        this.setState({money: money + count})
    }
    startGame = () => {
        if (!this.state.isStart) {
            this.setState({isStart: true})
            this.timerID = setInterval(
                () => this.tick(),
                250
            );
        }
    }
    tick = () => {
        const newDate = this.state.date;
        newDate.setDate(newDate.getDate() + 1);
        const year = newDate.getFullYear();
        const month = newDate.getMonth();
        const monthes = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
        const day = newDate.getDate();
        this.setState({
            date: newDate,
            dateStr: `${day} ${monthes[month]} ${year}`
        });
        while (this.taskManager.tasks[0]?.finishDate <= newDate) {
            const task: BaseTask = this.taskManager.tasks.shift();
            if (task instanceof SimpleTask) {
                const {users, money} = this.state;
                const newUsers = Math.floor(users[task.role].all * task.coefUsers)
                const newMoney = Math.floor(task.coefIncome * newUsers);
                task.resultTask = {users: newUsers, money: newMoney}
                users[task.role].all += newUsers;
                this.setState({
                    money: money + newMoney
                })
            }
            else if (task instanceof AdvertisingTask) {
                let coef = 0;
                switch(task.name) {
                    case AdvertisingType.LITTLE:
                        coef = Math.random();
                        break;
                    case AdvertisingType.MEDIUM:
                        coef = Math.random() * 2;
                        break;
                    case AdvertisingType.BIG:
                        coef = Math.random() * 3;
                        break;
                    default:
                        break;
                }
                const {users} = this.state;
                for (const role of Object.keys(users)) {
                    const newUsers = Math.floor(users[role as Role].all * coef);
                    users[role as Role].all += newUsers;
                    task.resultTask[role as Role] = newUsers;
                }
                
            }
            this.taskManager.finishTasks.push(task);
        }
        if (day === 1) {
            this.state.userStatistics[Role.LISTENER].shift();
            this.state.userStatistics[Role.LISTENER].push(this.state.users[Role.LISTENER].all);

            this.state.userStatistics[Role.AUTHOR].shift();
            this.state.userStatistics[Role.AUTHOR].push(this.state.users[Role.AUTHOR].all);

            this.state.userStatistics[Role.MODERATOR].shift();
            this.state.userStatistics[Role.MODERATOR].push(this.state.users[Role.MODERATOR].all);
        }
    }
    render() {
        return (
            <Context.Provider value= {
                    {
                        taskManager: this.taskManager,
                        dateDate: this.state.date,
                        date: this.state.dateStr,
                        startGame: this.startGame,
                        money: this.state.money,
                        changeMoney: this.changeMoney,
                        possibleActions: this.state.possibleActions,
                        possibleResults: this.state.possibleResults,
                        users: this.state.users,
                        userStatistics: this.state.userStatistics
                    }
                }>
                <NavigationContainer>
                    <Stack.Navigator>
                    <Stack.Screen
                        name="MainMenu"
                        component={MainMenu}
                        options={{ title: 'Главное меню' }}
                    />
                    <Stack.Screen
                        name="Actions"
                        component={Actions}
                        options={{ title: 'Действия' }}
                    />
                    <Stack.Screen
                        name="Advertising"
                        component={Advertising}
                        options={{ title: 'Реклама' }}
                    />
                    <Stack.Screen
                        name="Metrics"
                        component={Metrics}
                        options={{ title: 'Метрики' }}
                    />
                    <Stack.Screen
                        name="Tasks"
                        component={Tasks}
                        options={{ title: 'Задачи' }}
                    />
                    <Stack.Screen
                        name="Product"
                        component={Product}
                        options={{ title: 'Продукт' }}
                    />
                    <Stack.Screen
                        name="Users"
                        component={Users}
                        options={{ title: 'Пользователи' }}
                    />
                    <Stack.Screen
                        name="MetricResults"
                        component={MetricResults}
                        options={{ title: 'Результаты' }}
                    />
                    <Stack.Screen
                        name="SimpleResults"
                        component={SimpleResults}
                        options={{ title: 'Результаты' }}
                    />
                    <Stack.Screen
                        name="AdvertisingResults"
                        component={AdvertisingResults}
                        options={{ title: 'Результаты' }}
                    />
                    </Stack.Navigator>
                </NavigationContainer>
            </Context.Provider>
        );
    }
};

export default App;
