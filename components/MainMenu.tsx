import React from 'react';
import {
    Text,
    View,
    Pressable
} from 'react-native';
import Actions from './Actions'
import styles, {Context} from '../helpers/consts'

interface IProps {
    navigation: {
        navigate: Function;
    }
}

export class App extends React.Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            isNew: undefined
        }
    }

    render() {
        if (this.state.flag) {
            this.context.startGame()
            return (<Actions navigation={this.props.navigation}/>)
        }
        return (
        <View style={styles.sectionContainer}>
            <Text
            style={[
                styles.sectionTitle,
            ]}>
            Название
            </Text>
            <Pressable style={({pressed}) => [
                            styles.button, styles.width150,
                            pressed ? styles.buttonBackgroundClick : styles.buttonBackground]}
                        onPress={() => this.setState({flag: true, isNew: true})}>
                <Text style={styles.buttonText}>Начать</Text>
            </Pressable>
            <Pressable style={({pressed}) => [
                            styles.button, styles.width150,
                            pressed ? styles.buttonBackgroundClick : styles.buttonBackground]}
                        onPress={() => this.setState({flag: true, isNew: false})}>
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
 