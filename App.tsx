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
import { AdvertisingTask, BaseTask, MetricTask, SimpleTask, results, features } from './helpers/Tasks';
import { Advertising as AdvertisingType} from './helpers/Roles';
import { Header } from './components/Header';

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
    isPause: boolean;
    possibleActions: string[];
    possibleResults: string[];
    users: {[key: string]: number};
    userStatistics: {[key: string]: number[]};
    moneyStatistics: {[year: number]: {[month: number]: number}}
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
        this.taskManager.addTask(new SimpleTask(1, 1, new Date(2020, 0, 1), Role.LISTENER, features['кнопку паузы'], results['останавливать прослушивание музыки']));
        //this.taskManager.addTask(new SimpleTask(2, 2, new Date(2020, 0, 1), Role.AUTHOR, 'кнопку прогресс бар', 'видеть сколько будет загружаться песня'));
        //this.taskManager.addTask(new MetricTask(3, 4, new Date(2020, 0, 1), 2, Metric.ARPU));
        //this.taskManager.addTask(new MetricTask(4, 3, new Date(2020, 0, 1), 2, Metric.ARPU));
        this.state = {
            money: 10000,
            date: new Date(2020, 0, 1),
            dateStr: '1 Января 2020',
            isStart: false,
            isPause: false,
            possibleActions: ['кнопку прогресс бар', 'кнопку загрузки музыки'],
            possibleResults: ['загружать музыку', 'видеть сколько будет загружаться песня'],
            users: {
                [Role.LISTENER]: 30,
                [Role.AUTHOR]: 3,
                [Role.MODERATOR]: 9
            },
            userStatistics: {
                [Role.LISTENER]: [30, 30, 30, 30, 30],
                [Role.AUTHOR]: [4, 4, 4, 4, 4],
                [Role.MODERATOR]: [9, 9, 9, 9, 9]
            },
            moneyStatistics: {

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
        if (!this.state.isStart || this.state.isPause) {
            this.setState({isStart: true, isPause: false})
            this.timerID = setInterval(
                () => this.tick(),
                500
            );
        }
    }
    pauseGame = () => {
        clearInterval(this.timerID)
        this.setState({isPause: true})
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
                const newUsers = Math.floor(users[task.role] * task.coefUsers)
                const newMoney = Math.floor(task.coefIncome * newUsers);
                task.resultTask = {users: newUsers, money: newMoney}
                users[task.role] += newUsers;
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
                    const newUsers = Math.floor(users[role as Role] * coef);
                    users[role as Role].all += newUsers;
                    task.resultTask[role as Role] = newUsers;
                }
                
            }
            this.taskManager.finishTasks.push(task);
        }
        if (day === 1) {
            this.state.userStatistics[Role.LISTENER].shift();
            this.state.userStatistics[Role.LISTENER].push(this.state.users[Role.LISTENER]);

            this.state.userStatistics[Role.AUTHOR].shift();
            this.state.userStatistics[Role.AUTHOR].push(this.state.users[Role.AUTHOR]);

            this.state.userStatistics[Role.MODERATOR].shift();
            this.state.userStatistics[Role.MODERATOR].push(this.state.users[Role.MODERATOR]);
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
                        pauseGame: this.pauseGame,
                        money: this.state.money,
                        changeMoney: this.changeMoney,
                        possibleActions: this.state.possibleActions,
                        possibleResults: this.state.possibleResults,
                        users: this.state.users,
                        userStatistics: this.state.userStatistics,
                        isPause: this.state.isPause
                    }
                }>
                <NavigationContainer>
                    <Stack.Navigator>
                    <Stack.Screen
                        name="MainMenu"
                        component={this.state.isStart ? Actions : MainMenu}
                        options={{ headerTitle: (props) => <Header {...props} title={this.state.isStart ? 'Действия' : 'Главное меню'} hideMenu={!this.state.isStart}/> }}
                    />
                    <Stack.Screen
                        name="Advertising"
                        component={Advertising}
                        options={{ headerTitle: (props) => <Header {...props} title="Реклама"/> }}
                    />
                    <Stack.Screen
                        name="Metrics"
                        component={Metrics}
                        options={{ headerTitle: (props) => <Header {...props} title="Метрики"/> }}
                    />
                    <Stack.Screen
                        name="Tasks"
                        component={Tasks}
                        options={{ headerTitle: (props) => <Header {...props} title="Задачи"/> }}
                    />
                    <Stack.Screen
                        name="Product"
                        component={Product}
                        options={{ headerTitle: (props) => <Header {...props} title="Продукт"/> }}
                    />
                    <Stack.Screen
                        name="Users"
                        component={Users}
                        options={{ headerTitle: (props) => <Header {...props} title="Пользователи"/> }}
                    />
                    <Stack.Screen
                        name="MetricResults"
                        component={MetricResults}
                        options={{ headerTitle: (props) => <Header {...props} title="Результаты"/> }}
                    />
                    <Stack.Screen
                        name="SimpleResults"
                        component={SimpleResults}
                        options={{ headerTitle: (props) => <Header {...props} title="Результаты"/> }}
                    />
                    <Stack.Screen
                        name="AdvertisingResults"
                        component={AdvertisingResults}
                        options={{ headerTitle: (props) => <Header {...props} title="Результаты"/> }}
                    />
                    </Stack.Navigator>
                </NavigationContainer>
            </Context.Provider>
        );
    }
};

export default App;
