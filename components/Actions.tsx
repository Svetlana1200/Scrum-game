 import React from 'react';
 import {
   Text,
   View,
   Pressable,
   Alert
} from 'react-native';
import styles, {Context} from '../helpers/consts'

interface IProps {
    navigation: {
        navigate: Function;
        setOptions: Function;
    }
}

export class Actions extends React.Component<IProps> {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.standartText}>{this.context.date}</Text>
                    <Text style={styles.standartText}>{this.context.money}$</Text>
                </View>
                <View style={styles.sectionContainer}>
                    <Pressable style={({pressed}) => [
                                    styles.button, styles.width150,
                                    pressed ? styles.buttonBackgroundClick : styles.buttonBackground]}
                                onPress={() => this.props.navigation.navigate('Advertising')}>
                        <Text style={styles.buttonText}>Провести рекламу</Text>
                    </Pressable>
                    <Pressable style={({pressed}) => [
                                    styles.button, styles.width150,
                                    pressed ? styles.buttonBackgroundClick : styles.buttonBackground]}
                                onPress={() => this.props.navigation.navigate('Metrics')}>
                        <Text style={styles.buttonText}>Составить метрику</Text>
                    </Pressable>
                    <Pressable style={({pressed}) => [
                                    styles.button, styles.width150,
                                    pressed ? styles.buttonBackgroundClick : styles.buttonBackground]}
                                onPress={() => Alert.alert('Cannot press this one')}>
                        <Text style={styles.buttonText}>Провести опрос</Text>
                    </Pressable>
                    <Pressable style={({pressed}) => [
                                    styles.button, styles.width150,
                                    pressed ? styles.buttonBackgroundClick : styles.buttonBackground]}
                                onPress={() => this.props.navigation.navigate('Product')}>
                        <Text style={styles.buttonText}>Продукт</Text>
                    </Pressable>
                    <Pressable style={({pressed}) => [
                                    styles.button, styles.width150,
                                    pressed ? styles.buttonBackgroundClick : styles.buttonBackground]}
                                onPress={() => this.props.navigation.navigate('Tasks')}>
                        <Text style={styles.buttonText}>Задачи</Text>
                    </Pressable>
                </View>
            </View>
        )
    }
};
Actions.contextType = Context;

export default Actions;
 