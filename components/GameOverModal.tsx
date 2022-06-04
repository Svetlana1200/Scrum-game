import React, { Component} from 'react';
import {
  Text,
  View,
  Modal,
  Pressable
} from 'react-native';

import 'react-native-gesture-handler';
import styles, {Context} from '../helpers/consts'

interface IProps {
    navigation: {
        navigate: Function;
    }
}

export class GameOverModal extends Component<IProps> {
    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.context.gameOver}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.sectionTitle}>Игра окончена</Text>
                        <Text style={styles.standartText}>
                            Максимальное колчество пользователей: {Math.max.apply(null, this.context.userStatistics)}
                        </Text>
                        <Text style={styles.standartText}>
                            Спринтов: {this.context.sprint}
                        </Text>
                        <Pressable style={({pressed}) => [
                                        styles.button, styles.width300,
                                        pressed ? styles.buttonBackgroundClick : styles.buttonBackground]}
                                    onPress={() => {
                                        this.context.startGame()
                                        this.props.navigation.navigate('MainMenu')
                                    }}>
                            <Text style={styles.buttonText}>Начать заново</Text>
                        </Pressable>
                    </View>
                </View>
        </Modal>
        )
    }
}

GameOverModal.contextType = Context;
export default GameOverModal;