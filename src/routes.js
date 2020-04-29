import React from 'react';
import {createStackNavigator, cardStyleInterpolator, CardStyleInterpolators} from '@react-navigation/stack';
import Introducao from './screens/IntrodutionAppScroll';
import TelaLogin from './screens/TelaLogin';
import PreLog from './screens/PreLog';
import Cadastro from './screens/Cadastro';
import EditarPerfil from './screens/EditarPerfil';
import DashboardRoutes from '../routes/dashboard.routes';
<<<<<<< HEAD
import Pedido from './screens/Pedido/Pedido';
import Pesquisa from './screens/Pesquisa/Pesquisa';
import Resultado from './screens/Resultado/Resultado';
=======
import PagamentoPerfil from './screens/PagamentoPerfil';
import Cartao from './screens/Cartao';
import CadastrarCartao from './screens/CadastrarCartao';
import Header from './componentes/Header';
>>>>>>> 1c6527b9eb5264e83558203a073b0975b0c31a2c

const  AppStack = createStackNavigator();

function Routes(){  
    return(
<<<<<<< HEAD
            <AppStack.Navigator initialRouteName="PreLog" 
            
=======
        
            <AppStack.Navigator initialRouteName="Introducao" 
>>>>>>> 1c6527b9eb5264e83558203a073b0975b0c31a2c
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
<<<<<<< HEAD
                <AppStack.Screen name="Resultado" component={Resultado}/>
                
                
=======
                <AppStack.Screen name="PagamentoPerfil" component={PagamentoPerfil}/>
                <AppStack.Screen name="Cartao" component={Cartao}/>
                <AppStack.Screen name="CadastrarCartao" component={CadastrarCartao}/>
>>>>>>> 1c6527b9eb5264e83558203a073b0975b0c31a2c
            </AppStack.Navigator>
    )
}

export default Routes;