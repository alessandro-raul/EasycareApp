import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import Introducao from './screens/IntrodutionAppScroll';
import TelaLogin from './screens/TelaLogin';
import PreLog from './screens/PreLog';
import Cadastro from './screens/Cadastro';
import EditarPerfil from './screens/EditarPerfil';
import DashboardRoutes from '../routes/dashboard.routes';
import Enderecos from './screens/Enderecos';
import AdicionarEndereco from './screens/AdicionarEndereco';
import DetailMed from './screens/DetailMed/DetailMed';
import DetailProd from './screens/DetailProd/DetailProd';
import PerfilEstabelecimento from './screens/PerfilEstabelecimento/PerfilEstabelecimento';
import DetailEstabelecimento from './screens/DetailEstabelecimento';
import Todos from './screens/Todos';
import Categoria from './screens/Categoria';
import CategoriaProd from './screens/CategoriaProd';
import PagamentoPerfil from './screens/PagamentoPerfil';
import Pagamento from './screens/Pagamento';
import Cartao from './screens/Cartao';
import CadastrarCartao from './screens/CadastrarCartao';
import Cupom from './screens/Cupom';
import CadastrarCupom from './screens/CadastrarCupom';
import Notificacoes from './screens/Notificacoes';
import EditarEndereco from './screens/EditarEndereco';
import Resultado from './screens/Resultado/Resultado';
import PesquisaMedicamento from './screens/PesquisaMedicamento/PesquisaMedicamento';
import TelaAjuda from './screens/TelasAjuda/TelaAjuda';
import ProblemasComPedido from './screens/TelasAjuda/ProblemasComPedido';
import ProblemasComProduto from './screens/TelasAjuda/ProblemasComProduto';
import ProblemasComPagamento from './screens/TelasAjuda/ProblemasComPagamento';
import ProblemasComCupom from './screens/TelasAjuda/ProblemasComCupom';
import ProblemasNaConta from './screens/TelasAjuda/ProblemasNaConta/ProblemasNaConta';
import AlterarDados from './screens/TelasAjuda/ProblemasNaConta/AlterarDados';
import ProblemasComEndereco from './screens/TelasAjuda/ProblemasNaConta/ProblemasComEndereco';
import TelaSac from './screens/TelasAjuda/TelaSac';
import Pedidos from './screens/Pedidos';

const AppStack = createStackNavigator();

function Routes() {
  var tela = 'Home';
  return (
    <AppStack.Navigator
      initialRouteName={tela}
      screenOptions={{
        headerShown: false,
        /* headerTitleAlign: "center", 
                title: "Easycare", 
                fontSize: "2000px",*/
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <AppStack.Screen name="Introducao" component={Introducao} />
      <AppStack.Screen name="PreLog" component={PreLog} />
      <AppStack.Screen name="TelaLogin" component={TelaLogin} />
      <AppStack.Screen name="Cadastro" component={Cadastro} />
      <AppStack.Screen name="EditarPerfil" component={EditarPerfil} />
      <AppStack.Screen name="Home" component={DashboardRoutes} />
      <AppStack.Screen name="Perfil" component={DashboardRoutes} />
      <AppStack.Screen name="Enderecos" component={Enderecos} />
      <AppStack.Screen name="AdicionarEndereco" component={AdicionarEndereco} />
      <AppStack.Screen name="PagamentoPerfil" component={PagamentoPerfil} />
      <AppStack.Screen name="Pagamento" component={Pagamento} />
      <AppStack.Screen name="Cartao" component={Cartao} />
      <AppStack.Screen name="CadastrarCartao" component={CadastrarCartao} />
      <AppStack.Screen name="Cupom" component={Cupom} />
      <AppStack.Screen name="CadastrarCupom" component={CadastrarCupom} />
      <AppStack.Screen name="Notificacoes" component={Notificacoes} />
      <AppStack.Screen name="DetailMed" component={DetailMed} />
      <AppStack.Screen name="DetailProd" component={DetailProd} />
      <AppStack.Screen
        name="PesquisaMedicamento"
        component={PesquisaMedicamento}
      />
      <AppStack.Screen name="EditarEndereco" component={EditarEndereco} />
      <AppStack.Screen name="Resultado" component={Resultado} />
      <AppStack.Screen name="TelaAjuda" component={TelaAjuda} />
      <AppStack.Screen
        name="ProblemasComPedido"
        component={ProblemasComPedido}
      />
      <AppStack.Screen
        name="ProblemasComProduto"
        component={ProblemasComProduto}
      />
      <AppStack.Screen
        name="ProblemasComPagamento"
        component={ProblemasComPagamento}
      />
      <AppStack.Screen name="ProblemasComCupom" component={ProblemasComCupom} />
      <AppStack.Screen name="ProblemasNaConta" component={ProblemasNaConta} />
      <AppStack.Screen name="AlterarDados" component={AlterarDados} />
      <AppStack.Screen
        name="ProblemasComEndereco"
        component={ProblemasComEndereco}
      />
      <AppStack.Screen name="TelaSac" component={TelaSac} />
      <AppStack.Screen name="Pedidos" component={Pedidos} />
      <AppStack.Screen
        name="PerfilEstabelecimento"
        component={PerfilEstabelecimento}
      />
      <AppStack.Screen
        name="DetailEstabelecimento"
        component={DetailEstabelecimento}
      />
      <AppStack.Screen name="Categoria" component={Categoria} />
      <AppStack.Screen name="CategoriaProd" component={CategoriaProd} />
      <AppStack.Screen name="Todos" component={Todos} />
    </AppStack.Navigator>
  );
}

export default Routes;
