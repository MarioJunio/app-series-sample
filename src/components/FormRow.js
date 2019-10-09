import React from 'react';
import { View, StyleSheet } from 'react-native';

const FormRow = (props) => {

    const { last } = props;

    return (
        <View style={[Styles.container, last ? Styles.last : null]}>
            {props.children}
        </View>
    );
}

const Styles = StyleSheet.create({

    container: {
        marginTop: 5
    },

    last: {
        marginBottom: 10
    }
});

export default FormRow;