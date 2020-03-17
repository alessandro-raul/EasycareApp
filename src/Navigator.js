import React from 'react';
import {createBottomTabNavigator, createSwitchNavigator, createStackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './screens/Home';
import Login from './screens/TelaLogin';

const MenuRoutes = {

    Home: {
        name: 'Home',
        screen: Home,
        navigationOptions: {
            title: 'Home',
            tabBarIcon: ({tintColor}) =>
            <Icon name="home" size={25} color={tintColor} />
           
        },
       
    },

    Pesquisa: {
        name: "Pesquisa",
        screen: Home,
        navigationOptions: {
            title: 'Pesquisa',
            tabBarIcon: ({tintColor}) =>
            <Icon name="search" size={25} color={tintColor} />
        }
    },

    Carrinho: {
        name: "Carrinho",
        screen: Home,
        navigationOptions: {
            title: 'Carrinho',
            tabBarIcon: ({tintColor}) =>
            <Icon name="shopping-cart" size={25} color={tintColor} />
        }
        },

    Perfil: {
        name: "Perfil",
        screen: Login,
        navigationOptions: {
            title: 'Perfil',
            tabBarIcon: ({tintColor}) =>
            <Icon name="user" size={25} color={tintColor} />
        },
    }
    
}

const MenuConfig = {
    initialRouteName: 'Home',
    tabBarOptions: {
        style: { //Adição do style
           height: 50,
        },
        showLabel: false
       
    }
}

/*const initialRoute = createStackNavigator({
    Login
 },{
     navigationOptions: {
        header: null
     },
    });*/

const MenuNavigator = createBottomTabNavigator(MenuRoutes, MenuConfig);
//const MenuInitial = createStackNavigator(MenuNavigator, initialRoute);

export default MenuNavigator;