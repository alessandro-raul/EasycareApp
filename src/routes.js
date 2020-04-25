import React from 'react';
import {createStackNavigator, cardStyleInterpolator, CardStyleInterpolators} from '@react-navigation/stack';
import Introducao from './screens/IntrodutionAppScroll';
import TelaLogin from './screens/TelaLogin';
import PreLog from './screens/PreLog';
import Cadastro from './screens/Cadastro';
import EditarPerfil from './screens/EditarPerfil';
import DashboardRoutes from '../routes/dashboard.routes';
import PagamentoPerfil from './screens/PagamentoPerfil';
import Cartao from './screens/Cartao';
import CadastrarCartao from './screens/CadastrarCartao';
import Header from './componentes/Header';

const  AppStack = createStackNavigator();

function Routes(){  
    return(
        
            <AppStack.Navigator initialRouteName="Introducao" 
            screenOptions={{headerShown:false, 
           /* headerTitleAlign: "center", 
            title: "Easycare", 
            fontSize: "2000px",*/
            gestureEnabled: true,
            gestureDirection: "horizontal",
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}>
                <AppStack.Screen name="Introducao" component={Introducao}/>
                <AppStack.Screen name="PreLog" component={PreLog}/>
                <AppStack.Screen name="TelaLogin" component={TelaLogin}/>
                <AppStack.Screen name="Cadastro" component={Cadastro}/>
                <AppStack.Screen name="EditarPerfil" component={EditarPerfil}/>
                <AppStack.Screen name="Home" component={DashboardRoutes}/>
                <AppStack.Screen name="PagamentoPerfil" component={PagamentoPerfil}/>
                <AppStack.Screen name="Cartao" component={Cartao}/>
                <AppStack.Screen name="CadastrarCartao" component={CadastrarCartao}/>
            </AppStack.Navigator>
    )
}

export default Routes;