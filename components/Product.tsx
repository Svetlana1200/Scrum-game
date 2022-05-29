import React from 'react';
import {
    Text,
    View,
    Pressable
} from 'react-native';
import styles, {Context} from '../helpers/consts'

interface IProps {
    navigation: {
        navigate: Function
    }
}

export class Product extends React.Component<IProps> {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.standartText}>{this.context.date}</Text>
                    <Text style={styles.standartText}>{this.context.money}$</Text>
                </View>
                <View style={styles.sectionContainer}>
                    <Pressable style={({pressed}) => [
                                styles.button, styles.width300,
                                pressed ? styles.buttonBackgroundClick : styles.buttonBackground]}
                            onPress={() => this.props.navigation.navigate('Users')}>
                        <Text style={styles.buttonText}>Пользователи</Text>
                    </Pressable>
                </View>
            </View>
        )
    }
};
Product.contextType = Context;

export default Product;
