import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {cardStyleInterpolator, CardStyleInterpolators} from '@react-navigation/stack';
import Home from '../src/screens/Home';
import TelaLogin from '../src/screens/TelaLogin';
import Perfil from '../src/screens/Perfil';
import Pedido from '../src/screens/Pedido/Pedido';
import Pesquisa from '../src/screens/Pesquisa/Pesquisa';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();
var azul = '#23AFDB';
function DashboardRoutes() {
   
    return (
        
     <Tab.Navigator 
    
     screenOptions={{headerShown:false, 
     gestureEnabled: true,
     gestureDirection: "horizontal",
     cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }}
    
     >
         <Tab.Screen name="Home" component={Home} 
         options={{
       
          tabBarIcon: ({color}) => (
            <Icon name="home" color={color} size={26} />
          ),
        }} />

         <Tab.Screen name="Pesquisa" component={Pesquisa}
          options={{
       
            tabBarIcon: ({color}) => (
              <Icon name="search" color={color} size={26} />
            ),
          }}/>

         <Tab.Screen name="Pedido" component={Pedido}
          options={{
       
            tabBarIcon: ({color}) => (
              <Icon name="local-mall" color={color} size={26} />
            ),
          }}/>

         <Tab.Screen name="Perfil" component={Perfil}
          options={{
       
            tabBarIcon: ({color}) => (
              <Icon name="person" color={color} size={26} />
            ),
          }}/>
     </Tab.Navigator>
     
    )
  }

  export default DashboardRoutes;