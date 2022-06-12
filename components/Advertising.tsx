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
    addAdvertising(name: AdvertisingType) {
        const task = new AdvertisingTask(this.context.taskManager.nextId, name)
        this.context.taskManager.addTask(task);
        this.context.addTask(task);
    }

    renderRow(name: AdvertisingType) {
        const advertising = AdvertisingTask.advertising[name];
        let disabled = false;
        if (name === AdvertisingType.BIG) {
            disabled = this.context.addedAdvertisingBig
        }
        else if (name === AdvertisingType.MEDIUM) {
            disabled = this.context.addedAdvertisingMedium
        }
        else if (name === AdvertisingType.LITTLE) {
            disabled = this.context.addedAdvertisingLittle
        }
        return (
            <Pressable style={({pressed}) => [
                            styles.button, styles.width300,
                            pressed ? styles.buttonBackgroundClick : (disabled ? styles.buttonBackgroundDisable : styles.buttonBackground)]}
                        disabled={disabled}
                        onPress={() => this.addAdvertising(name)}>
                <Text style={styles.buttonTextName}>{name}</Text>
                <Text style={[styles.buttonTextTime, styles.width120]}>{advertising.time}</Text>
                <Text style={[styles.buttonTextTime, styles.width120]}>{AdvertisingTask.countSprints[name]}</Text>
                <Text style={styles.buttonTextCount}>{advertising.price}$</Text>
                <Text style={styles.width30}>{disabled ? '✓' : ''}</Text>
            </Pressable>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.standartText}>Спринт №{this.context.sprint}</Text>
                    <Text style={styles.standartText}>Пользователи: {this.context.userStatistics[this.context.userStatistics.length - 1] * 100}</Text>
                    <Text style={styles.standartText}>{this.context.money}$</Text>
                </View>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>
                        Выбор рекламной кампании
                    </Text>
                    <View style={styles.titles}>
                        <Text style={styles.buttonTextName}></Text>
                        <Text style={[styles.buttonTextTime, styles.width120]}>Срок (в спринтах)</Text>
                        <Text style={[styles.buttonTextTime, styles.width120]}>sp в спринт</Text>
                        <Text style={styles.buttonTextCount}>Цена</Text>
                        <Text style={styles.width30}></Text>
                    </View>
                    {Object.keys(AdvertisingTask.advertising).map((advertising) => this.renderRow(advertising as AdvertisingType))}
                </View>
            </View>
        );
    }
};

Advertising.contextType = Context;

export default Advertising;
 