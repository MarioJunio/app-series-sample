import { createAppContainer, createStackNavigator } from 'react-navigation';
import LoginScreen from './screen/LoginScreen';
import SeriesScreen from './screen/SeriesScreen';

const StackNavigator = createStackNavigator({
    'Login': {
        screen: LoginScreen,
        navigationOptions: {
            title: 'Autenticação'
        }
    },
    'Series': {
        screen: SeriesScreen,
        navigationOptions: {
            title: 'Series',
            headerLeft: null
        }
    }
}, {
    defaultNavigationOptions: {
        title: 'Series',
        headerTintColor: '#FFF',
        headerTitleStyle: {
            color: '#FFF'
        },
        headerStyle: {
            backgroundColor: '#ff7043'
        }
    }
});

const AppContainer = createAppContainer(StackNavigator);

export default AppContainer;