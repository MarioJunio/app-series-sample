import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import FormRow from '../components/FormRow';
import firebase from 'firebase';
import { tentarEntrar, criarConta } from '../actions';
import { connect } from 'react-redux';

class LoginScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            senha: '',
            message: '',
            loading: false
        }
    }

    componentDidMount() {

        const firebaseConfig = {
            apiKey: "AIzaSyBJUXeNXOMgt0CVOIFCNcveb6i7Q5JkwCY",
            authDomain: "series-f78ad.firebaseapp.com",
            databaseURL: "https://series-f78ad.firebaseio.com",
            projectId: "series-f78ad",
            storageBucket: "",
            messagingSenderId: "357006432781",
            appId: "1:357006432781:web:6120261b45df6d98"
        };

        firebase.initializeApp(firebaseConfig);
    }

    navegarParaSeries() {
        this.props.navigation.navigate('Series');
    }

    setInput(input, value) {
        this.setState({
            [input]: value
        });
    }

    entrar() {
        const { email, senha } = this.state;

        this.setState({
            loading: true
        });

        this.props
            .tentarEntrar(email, senha)
            .then(() => {

                this.setState({
                    message: ''
                });

                this.navegarParaSeries();

            }).catch(error => {

                console.log(error);

                // se o usuario nao foi encontrado
                // sera apresentado um alert, caso ele deseja criar sua conta agora
                if (error.code === 'auth/user-not-found') {
                    this.criar();
                }

                // atualiza state com a mensagem de erro apropriada
                this.setState({
                    message: this.handleErrorCode(error.code)
                });

            }).finally(() => {
                this.setState({
                    loading: false
                });
            });
    }

    criar() {

        Alert.alert('Conta não encontrada', 'O usuário informado não existe, deseja criar uma conta associada a este usuário?', [
            {
                text: 'Não',
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: this.criarConta
            }
        ], { cancelable: false });

    }

    criarConta = () => {

        this.props.criarConta.then(() => {

            this.setState({
                message: ''
            });

            this.navegarParaSeries();

        }).catch(error => {
            console.log('Erro ao criar conta', error.code);
        });
    }

    render() {
        return (
            <View style={Styles.container}>

                <FormRow>
                    <TextInput keyboardType="email-address" autoCapitalize="none" placeholder="Email" value={this.state.email} onChangeText={(text) => this.setInput('email', text)} style={Styles.input} />
                </FormRow>

                <FormRow last>
                    <TextInput secureTextEntry placeholder="******" value={this.state.senha} onChangeText={(text) => this.setInput('senha', text)} style={Styles.input} />
                </FormRow>

                {this.renderButtonOrLoading()}

                {this.renderErrorMessage()}

            </View>
        )
    }

    renderButtonOrLoading() {

        return (
            this.state.loading
                ? <ActivityIndicator size="large" color="#0000ff" />
                : <Button title="Entrar" onPress={() => this.entrar()} />
        )

    }

    renderErrorMessage() {

        return (
            this.state.message
                ? <View style={Styles.loginMessage}>
                    <Text style={Styles.message}>{this.state.message}</Text>
                </View>
                : null
        )
    }

    handleErrorCode(code) {
        let message = '';

        if (code === 'auth/invalid-email') {
            message = 'O endereço de email está inválido';
        } else if (code === 'auth/wrong-password') {
            message = 'Senha incorreta';
        } else if (code === 'auth/user-not-found') {
            message = 'Email não encontrado';
        } else if (code === 'auth/weak-password') {
            message = 'Senha muito fraca';
        } else if (code === 'auth/user-disabled') {
            message = 'Conta invativa ';
        } else {
            message = 'Não foi possível realizar a autenticação';
        }

        return message;
    }
}

const Styles = StyleSheet.create({

    container: {
        margin: 10,
        justifyContent: "center",
        height: '90%'
    },

    input: {
        padding: 10,
        backgroundColor: '#FAFAFA',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#EEEEEE'
    },

    loginMessage: {
        marginTop: 20,
        alignSelf: "center"
    },

    message: {
        fontSize: 16,
        color: "#424242"
    }
});

export default connect(null, {
    tentarEntrar,
    criarConta
})(LoginScreen);