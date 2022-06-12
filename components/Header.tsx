import React from 'react';
import {
    Pressable,
    Text,
    View
} from 'react-native';
import styles, {Context} from '../helpers/consts'

type IProps = {
    title: string;
    hideMenu?: boolean;
}

export class Header extends React.Component<IProps> {
    render() {
        return (
            <View style={[styles.headerScreen]}>
                <Text style={styles.headerTitle}>{this.props.title}</Text>
                {
                    !this.props.hideMenu &&
                    <Pressable style={({pressed}) => [
                                        styles.headerButton,
                                        pressed ? styles.buttonBackgroundClick : styles.buttonBackground
                                    ]}
                                onPress={() => {
                                    this.context.changeVisible(true)
                                }}>
                        <Text style={styles.headerTitle}>Правила</Text>
                    </Pressable>
                }
            </View>
        )
    }
};
Header.contextType = Context;

export default Header;
