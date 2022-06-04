import React, {Component} from 'react';
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
            </View>
        )
    }
};
Header.contextType = Context;

export default Header;
