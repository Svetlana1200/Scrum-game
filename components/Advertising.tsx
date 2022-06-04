import React from 'react';
import {
    Text,
    View,
    Pressable,
} from 'react-native';
import 'react-native-gesture-handler';
import styles, {Context} from '../helpers/consts'
import { Advertising as AdvertisingType } from '../helpers/Roles';
import { AdvertisingTask } from '../helpers/Tasks';

export class Advertising extends React.Component {
    advertisings = {
        [AdvertisingType.LITTLE]: {time: 1, price: 100},
        [AdvertisingType.MEDIUM]: {time: 2, price: 200},
        [AdvertisingType.BIG]: {time: 3, price: 400}
    }

    addAdvertising(name: AdvertisingType) {
        const advertising = this.advertisings[name]
        this.context.changeMoney(-advertising.price);
        const task = new AdvertisingTask(this.context.taskManager.nextId, name)
        this.context.taskManager.addTask(task)
    }

    renderRow(name: AdvertisingType) {
        const advertising = this.advertisings[name]
        return (
            <Pressable style={({pressed}) => [
                            styles.button, styles.width300,
                            pressed ? styles.buttonBackgroundClick : styles.buttonBackground]}
                        onPress={() => this.addAdvertising(name)}>
                <Text style={styles.buttonTextName}>{name}</Text>
                <Text style={styles.buttonTextTime}>{advertising.time} спринта</Text>
                <Text style={styles.buttonTextCount}>{advertising.price}$</Text>
            </Pressable>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.standartText}>Спринт №{this.context.sprint}</Text>
                    <Text style={styles.standartText}>{this.context.money}$</Text>
                </View>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>
                        Выбор рекламы
                    </Text>
                    <View style={styles.titles}>
                        <Text style={styles.buttonTextName}></Text>
                        <Text style={styles.buttonTextTime}>Срок</Text>
                        <Text style={styles.buttonTextCount}>Цена</Text>
                    </View>
                    {Object.keys(this.advertisings).map((advertising) => this.renderRow(advertising as AdvertisingType))}
                </View>
            </View>
        );
    }
};

Advertising.contextType = Context;

export default Advertising;
 