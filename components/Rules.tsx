import React, { Component} from 'react';
import {
  Text,
  View,
  Modal,
  Pressable
} from 'react-native';

import 'react-native-gesture-handler';
import styles, {Context} from '../helpers/consts'

export class Rules extends Component {
    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.context.visibleRules}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.sectionTitle}>Правила</Text>
                        <Text style={styles.standartText}>
                            Вы являетесь менеджером Скрам команды, которая разрабатывает сервис для прослушивания музыки.
                            Ваша задача - как можно дольше удерживать количетсво денег выше нуля.
                        </Text>
                        <Text style={styles.standartText}>
                            Выполняйте задачи для повышения количества пользователей и средний доход от одного пользователя.
                            Проводите опросы для создания новых задач.
                            Проводите рекламные кампании для повышения количества пользователей.
                            Составляйте метрики для понимания развития продукта.
                            Как только сумма денег становится меньше нуля - игра оканчивается.
                        </Text>
                        <Text style={styles.standartText}>Постарайтесь продержаться как можно дольше. Удачи!</Text>
                        <Pressable style={({pressed}) => [
                                        styles.button, styles.width300,
                                        pressed ? styles.buttonBackgroundClick : styles.buttonBackground]}
                                    onPress={() => {
                                        this.context.changeVisible(false)
                                    }}>
                            <Text style={styles.buttonText}>Играть</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        )
    }
}

Rules.contextType = Context;
export default Rules;