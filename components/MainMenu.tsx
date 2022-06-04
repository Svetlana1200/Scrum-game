import React from 'react';
import {
    Text,
    View,
    Pressable
} from 'react-native';
import styles, {Context} from '../helpers/consts'

interface IProps {
    navigation: {
        navigate: Function;
    }
}

export class App extends React.Component<IProps> {
    render() {
        return (
        <View style={styles.sectionContainer}>
            <Text
            style={[
                styles.sectionTitle,
            ]}>
            Scrum
            </Text>
            <Pressable style={({pressed}) => [
                            styles.button, styles.width150,
                            pressed ? styles.buttonBackgroundClick : styles.buttonBackground]}
                        onPress={() => this.context.startGame()}>
                <Text style={styles.buttonText}>Начать</Text>
            </Pressable>
            <Pressable style={({pressed}) => [
                            styles.button, styles.width150,
                            pressed ? styles.buttonBackgroundClick : styles.buttonBackground]}
                        onPress={() => this.context.startGame()}>
                <Text style={styles.buttonText}>Продолжить</Text>
            </Pressable>
            <Pressable style={({pressed}) => [
                            styles.button, styles.width150,
                            pressed ? styles.buttonBackgroundClick : styles.buttonBackground]}>
                <Text style={styles.buttonText}>Выйти</Text>
            </Pressable>
        </View>
        )
   }
};
App.contextType = Context;

 export default App;
 