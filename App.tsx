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
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainMenu from './components/MainMenu';
import Actions from './components/Actions';
import Advertising from './components/Advertising'
import Metrics from './components/Metrics'
import Tasks from './components/Tasks'
import Product from './components/Product'
import Sprint from './components/Sprint';
import Interviews from './components/Interview';
import {Context} from './helpers/consts'
import {Metric, Role, Advertising as AdvertisingType} from './helpers/Roles'
import {TaskManager} from './helpers/TaskManager';
import {SimpleTask, results, features, BaseTask, MetricTask, AdvertisingTask, InterviewTask} from './helpers/Tasks';
import {Header} from './components/Header';

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

interface IFlagsAddedTask {
    addedMetricARPU: boolean;
    addedMetricRR: boolean;
    addedInterview: boolean;
    addedAdvertisingBig: boolean;
    addedAdvertisingMedium: boolean;
    addedAdvertisingLittle: boolean;
}

type IState = IFlagsAddedTask & {
    money: number;
    isStart: boolean;
    possibleFeatures: string[];
    possibleResults: string[];
    userStatistics: number[];
    sprint: number;
    ARPUStatistics: number[];
    RRStatistics: number[];
    usersToReduce: number;
    gameOver: boolean;
    visibleRules: boolean;
}

export class App extends React.Component<{}, IState> {
    sprintCost = 1000;
    taskManager: TaskManager
    constructor(props: {}) {
        super(props)
        this.taskManager = new TaskManager([])
        this.taskManager.addTask(new SimpleTask(1, Role.LISTENER, features['кнопку паузы'], results['останавливать прослушивание музыки']));
        //this.taskManager.addTask(new SimpleTask(2, 2, new Date(2020, 0, 1), Role.AUTHOR, 'кнопку прогресс бар', 'видеть сколько будет загружаться песня'));
        //this.taskManager.addTask(new MetricTask(3, 4, new Date(2020, 0, 1), 2, Metric.ARPU));
        //this.taskManager.addTask(new MetricTask(4, 3, new Date(2020, 0, 1), 2, Metric.ARPU));
        this.state = {
            money: 10000,
            isStart: false,
            possibleFeatures: ['кнопку прогресс бар', 'кнопку загрузки музыки'],
            possibleResults: ['загружать музыку', 'видеть сколько будет загружаться песня'],
            sprint: 1,
            ARPUStatistics: [10],
            RRStatistics: [100],
            userStatistics: [30],
            usersToReduce: 5,
            gameOver: false,
            visibleRules: false,

            addedMetricARPU: false,
            addedMetricRR: false,
            addedInterview: false,
            addedAdvertisingBig: false,
            addedAdvertisingMedium: false,
            addedAdvertisingLittle: false
        }
    }
    startGame = () => {
        this.taskManager = new TaskManager([]);
        this.taskManager.addTask(new SimpleTask(1, Role.LISTENER, features['кнопку паузы'], results['останавливать прослушивание музыки']));
        this.setState({
            isStart: true,
            gameOver: false,
            visibleRules: false,
            money: 3000,
            possibleFeatures: ['прогресс бар', 'кнопку загрузки музыки'],
            possibleResults: ['загружать музыку', 'видеть сколько будет загружаться песня'],
            sprint: 1,
            ARPUStatistics: [10],
            RRStatistics: [100],
            userStatistics: [30],
            usersToReduce: 5,
            
            addedMetricARPU: false,
            addedMetricRR: false,
            addedInterview: false,
            addedAdvertisingBig: false,
            addedAdvertisingMedium: false,
            addedAdvertisingLittle: false
        })
    }
    startSprint = () => {
        const {diffProfitARPU, diffProfitUsers, RR, countNewFeatures, countNewResults, cost, addedTaskFlags} = this.taskManager.executeSprint();
        let statistics = this.state.ARPUStatistics;
        this.state.ARPUStatistics.push(statistics[statistics.length - 1] + diffProfitARPU);
        const currentARPU = statistics[statistics.length - 1];

        statistics = this.state.userStatistics;
        this.state.userStatistics.push(Math.max(statistics[statistics.length - 1] + diffProfitUsers - this.state.usersToReduce, 0));
        const currentUsers = statistics[statistics.length - 1]

        statistics = this.state.RRStatistics;
        if (RR) {
            const userStatistics = this.state.userStatistics;
            this.state.RRStatistics.push((userStatistics[userStatistics.length - 1] - diffProfitUsers) / userStatistics[userStatistics.length - 2] * 100);
        }
        else
            this.state.RRStatistics.push(statistics[statistics.length - 1]);

        for (let i = 0; i < countNewFeatures; i++) {
            const unknowFeatures = Object.keys(features).filter(x => !this.state.possibleFeatures.includes(x))
            if (unknowFeatures.length) {
                const indexNewFeature = Math.floor(Math.random() * unknowFeatures.length);
                this.state.possibleFeatures.push(unknowFeatures[indexNewFeature])
            }
        }
        for (let i = 0; i < countNewResults; i++) {
            const unknowResults = Object.keys(results).filter(x => !this.state.possibleResults.includes(x))
            if (unknowResults.length) {
                const indexNewResult = Math.floor(Math.random() * unknowResults.length);
                this.state.possibleResults.push(unknowResults[indexNewResult])
            }
        }
        
        const currentMoney = this.state.money + currentARPU * currentUsers - this.sprintCost - cost;
        this.setState((state) => {
            return {
                sprint: state.sprint + 1,
                money: currentMoney,
                usersToReduce: state.usersToReduce + 5,
                gameOver: currentMoney < 0,
                ...addedTaskFlags
            }
        })
    }
    removeSelectedFeatureAndResult = (feature: string, result: string) => {
        const indexFeature = this.state.possibleFeatures.indexOf(feature);
        this.state.possibleFeatures.splice(indexFeature, 1)

        const indexResult = this.state.possibleResults.indexOf(result);
        this.state.possibleResults.splice(indexResult, 1)
    }

    addTask = (task: BaseTask) => {
        if (task instanceof MetricTask) {
            if (task.name === Metric.ARPU) 
                this.setState({addedMetricARPU: true})
            else if (task.name === Metric.RR) 
                this.setState({addedMetricRR: true})
        }
        if (task instanceof AdvertisingTask) {
            if (task.size === AdvertisingType.BIG) 
                this.setState({addedAdvertisingBig: true})
            else if (task.size === AdvertisingType.MEDIUM) 
                this.setState({addedAdvertisingMedium: true})
            else if (task.size === AdvertisingType.LITTLE) 
                this.setState({addedAdvertisingLittle: true})
        }
        if (task instanceof InterviewTask) {
            this.setState({addedInterview: true})
        }
    }
    changeVisible = (visible: boolean) => {
        this.setState({visibleRules: visible})
    }

    render() {
        return (
            <Context.Provider value= {
                    {
                        taskManager: this.taskManager,
                        sprintCost: this.sprintCost,
                        startGame: this.startGame,
                        startSprint: this.startSprint,
                        removeSelectedFeatureAndResult: this.removeSelectedFeatureAndResult,
                        addTask: this.addTask,
                        changeVisible: this.changeVisible,
                        ...this.state
                    }
                }>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen
                            name="MainMenu"
                            component={this.state.isStart ? Actions : MainMenu}
                            options={{
                                headerTitle: (props) =>
                                    <Header
                                        {...props} 
                                        title={this.state.isStart ? 'Действия' : 'Главное меню'}
                                        hideMenu={!this.state.isStart}
                                    />,
                                    headerTitleStyle: { flex: 1}
                                }}
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
                            name="Interviews"
                            component={Interviews}
                            options={{ headerTitle: (props) => <Header {...props} title="Опросы"/> }}
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
                            name="Sprint"
                            component={Sprint}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </Context.Provider>
        );
    }
};

export default App;
