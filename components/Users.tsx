import React from 'react';
import {
    Text,
    View,
    ScrollView
} from 'react-native';
import styles, {Context} from '../helpers/consts'
import { Role } from '../helpers/Roles';
import UserStatistic from './UserStatistic'

export class App extends React.Component {
    renderRow(text1: string, text2: string, text3: string) {
        return (
        <View style={[styles.row, styles.offset]}>
            <Text style={[styles.standartText, styles.width120]}>{text1}</Text>
            <Text style={[styles.standartText, styles.width90]}>{text2}</Text>
            <Text style={[styles.standartText, styles.width90]}>{text3}</Text>
        </View>
        )
    }

    render() {
        let monthesforGrafic = []
        let indexMonth: number = this.context.dateDate.getMonth();
        const monthes = ['Январь', 'Февраль', 'Март', 'Апрель', 'Мая', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        for (let i = 0; i < 5; i++) {
            monthesforGrafic.push(monthes[indexMonth]);
            indexMonth -= 1;
            if (indexMonth < 0) {
                indexMonth = monthes.length - 1;
            }
        }
        monthesforGrafic = monthesforGrafic.reverse()
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.standartText}>{this.context.date}</Text>
                    <Text style={styles.standartText}>{this.context.money}$</Text>
                </View>
                <ScrollView>
                    <View style={styles.sectionContainer}>
                        {this.renderRow('', 'Всего', 'С подпиской')}
                        {this.renderRow('Модераторы', this.context.users[Role.MODERATOR].all, this.context.users[Role.MODERATOR].subscription)}
                        {this.renderRow('Слушатели', this.context.users[Role.LISTENER].all, this.context.users[Role.LISTENER].subscription)}
                        {this.renderRow('Авторы', this.context.users[Role.AUTHOR].all, this.context.users[Role.AUTHOR].subscription)}
                    </View>
                    <View>
                        <UserStatistic monthesforGrafic={monthesforGrafic} role={Role.MODERATOR}/>
                        <UserStatistic monthesforGrafic={monthesforGrafic} role={Role.LISTENER}/>
                        <UserStatistic monthesforGrafic={monthesforGrafic} role={Role.AUTHOR}/>
                    </View>

                </ScrollView>
            </View>
        )
    }
};
App.contextType = Context;

export default App;
