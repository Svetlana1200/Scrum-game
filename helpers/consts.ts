import {StyleSheet, Dimensions} from 'react-native';
import React from 'react';
export const Context = React.createContext();

const styles = StyleSheet.create( {
    width50: {
        width: 50
    },
    buttonBackgroundClick: {
        backgroundColor: '#F2B9B9'
    },
    buttonBackground: {
        backgroundColor: '#FAE4E4'
    },
    buttonBackgroundDisable: {
        backgroundColor: '#b3b3b3'
    },
    container: {
        backgroundColor: '#ffffff',
        flex: 1
    },
    sectionContainer: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000',
        marginBottom: 17
    },
    buttonText: {
        color: '#000000',
        fontSize: 15,
        textAlign: 'center'
    },
    titles: {
        width: 300,
        height: 34,
        marginBottom: 17,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    width150: {
        width: 150,
    },
    width300: {
        width: 300,
    },
    width120: {
        width: 120
    },
    width90: {
        width: 90
    },
    width30: {
        width: 30,
        height: 30,
        textAlign: 'center'
    },
    button: {
        height: 34,
        marginBottom: 17,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    buttonTextName: {
        color: '#000000',
        fontSize: 15,
        textAlign: 'center',
        width: 100,
    },
    buttonTextCount: {
        color: '#000000',
        fontSize: 15,
        textAlign: 'center',
        width: 50,
    },
    buttonTextTime: {
        color: '#000000',
        fontSize: 15,
        textAlign: 'center',
        width: 150,
    },
    standartText: {
        color: '#000000'
    },
    errorText: {
        color: '#ff0000'
    },
    standartInput: {
        width: 50,
        height: 20,
        textAlign: 'center',
        padding: 0,
        borderColor: '#000000',
        borderWidth: 1,
        marginLeft: 5,
        marginRight: 5
    },
    roleSelector: {
        width: 200
    },
    stringBlock: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10
    },
    itemBlock: {
        marginRight: 10
    },
    width: {
        width: 180
    },
    row: {
        flexDirection: 'row',
    },
    border: {
        marginBottom: 10,
        marginTop: 10,
        borderColor: '#000000',
        borderBottomWidth: 1,
        borderTopWidth: 1
    },
    centeredView: {
        backgroundColor: "grey",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    offset: {
        marginBottom: 10
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20
    },
    headerScreen: {
        width: Dimensions.get("window").width - 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 18,
        color: '#000000'
    },
    headerButton: {
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 34,
        padding: 5,
        width: 80
    },
    headerAddingTasks: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});


export default styles