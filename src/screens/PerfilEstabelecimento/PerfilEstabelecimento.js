import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconAwesome from 'react-native-vector-icons/FontAwesome5';
//import IconFeather from 'react-native-vector-icons/Feather';
import MeuHeader from '../../componentes/Header';
import logo from '../../../assets/imgs/drogariasp.png';
import Remedio from '../../../assets/imgs/remedio.png';
import SearchBarHome from '../../componentes/SearchBarHome';
import api from '../../services/api';
import styles from './style';
import HeaderScroll from '../../componentes/HeaderScroll';
import {Tab, Tabs} from 'native-base';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

export default function PerfilEstabelecimento({navigation}) {
  navigation = useNavigation();
  const route = useRoute();
  console.disableYellowBox = true;

  const [nomeEstabelecimento, setNomeEstabelecimento] = useState('');
  const [cnpjEstabelecimento, setCnpjEstabelecimento] = useState(0);
  const [logEstabelecimento, setLogEstabelecimento] = useState(0);
  const [numLogEstabelecimento, setNumLogEstabelecimento] = useState(0);
  const [cepLogEstabelecimento, setCepLogEstabelecimento] = useState(0);
  const [bairroLogEstabelecimento, setBairroLogEstabelecimento] = useState('');
  const [cidadeLogEstabelecimento, setCidadeLogEstabelecimento] = useState('');
  const [ufLogEstabelecimento, setUfLogEstabelecimento] = useState('');
  const [taxaDeEntregaEstabelecimento, setTaxaDeEntregaEstabelecimento] = useState('');
  const [statusEstabelecimento, setStatusEstabelecimento] = useState('');
  const [products, setProducts] = useState([]);
  const [productsOffers, setProductsOffers] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [produtosMaisVendidos, setProdutosMaisVendidos] = useState([]);
  const [medicaments, setMedicaments] = useState([]);
  const [medicamentsOffers, setMedicamentsOffers] = useState([]);
  const [medicamentosMaisVendidos, setMedicamentosMaisVendidos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [statusMaisVendido, setStatusMaisVendido] = useState(false);
  const [statusMaisVendidoProd, setStatusMaisVendidoProd] = useState(false);
  const idEstabelecimento = route.params.idEstabelecimento;
  const todos = true;
  const promocoesEstabelecimento = true;
  const [visible, setVisible] = useState(false);


  useEffect(() => {
    loadDadosEstablishment(idEstabelecimento);
    loadMedicaments(idEstabelecimento, todos);
    loadMedicamentosMaisVendidos(idEstabelecimento);
    loadMedicamentsOffers(idEstabelecimento, promocoesEstabelecimento);
    loadCategories(idEstabelecimento);
    loadProducts(idEstabelecimento);
    loadProductsMaisVendidos(idEstabelecimento);
    loadProductsOffers(idEstabelecimento, promocoesEstabelecimento);
    loadProductCategories(idEstabelecimento);
  }, []);

  async function loadDadosEstablishment(idEstabelecimento) {
    const response = await api.get('/Establishment', {
      params: {idEstabelecimento},
    });
    var data = response.data.response;
    data.map(item => {
      setNomeEstabelecimento(item.nomeEstabelecimento);
      setCnpjEstabelecimento(item.cnpjEstabelecimento);
      setLogEstabelecimento(item.logEstabelecimento);
      setNumLogEstabelecimento(item.numLogEstabelecimento);
      setCepLogEstabelecimento(item.cepLogEstabelecimento);
      setBairroLogEstabelecimento(item.bairroLogEstabelecimento);
      setCidadeLogEstabelecimento(item.cidadeLogEstabelecimento);
      setUfLogEstabelecimento(item.ufLogEstabelecimento);
      setTaxaDeEntregaEstabelecimento(item.taxaDeEntregaEstabelecimento);
      setStatusEstabelecimento(item.statusEstabelecimento);
    });
  }

  function navigateToDetailEstabelecimento(
    idEstabelecimento,
    nomeEstabelecimento,
    cnpjEstabelecimento,
    logEstabelecimento,
    numLogEstabelecimento,
    bairroLogEstabelecimento,
    cidadeLogEstabelecimento,
    ufLogEstabelecimento,
    cepLogEstabelecimento,
  ) {
    navigation.navigate('DetailEstabelecimento', {
      idEstabelecimento,
      nomeEstabelecimento,
      cnpjEstabelecimento,
      logEstabelecimento,
      numLogEstabelecimento,
      bairroLogEstabelecimento,
      cidadeLogEstabelecimento,
      ufLogEstabelecimento,
      cepLogEstabelecimento,
    });
  }

  function navigateToCategoria(nomeCategoria, idEstabelecimento) {
    navigation.navigate('Categoria', {nomeCategoria, idEstabelecimento});
  }

  function navigateToCategoriaProd(nomeCategoria, idEstabelecimento) {
    navigation.navigate('CategoriaProd', {nomeCategoria, idEstabelecimento});
  }

  //Medicamentos e suas categorias
  async function loadMedicaments(idEstabelecimento, todos) {
    const response = await api.get('/Medicament', {params:{idEstabelecimento: idEstabelecimento, todos: todos}});
    const data = response.data.response;
    setMedicaments(data);
    setTimeout(() => setVisible(true),1800);
  }

  async function loadMedicamentosMaisVendidos(idEstabelecimento) {
    try {
      const response = await api.get('/MedsMaisVendidos/', {params:{idEstabelecimento: idEstabelecimento}});
      const data = response.data.response;
      console.log(data);
      if(data != ''){
        setStatusMaisVendido(true)
      }
      setMedicamentosMaisVendidos(data);
      setTimeout(() => setVisible(true),1800);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadMedicamentsOffers(idEstabelecimento, promocoesEstabelecimento){
    const response = await api.get('/Medicament', {
      params: {idEstabelecimento, promocoesEstabelecimento},
    });
    const data = response.data.response;
    setMedicamentsOffers(data);
  }

  async function loadCategories(idEstabelecimento) {
    const response = await api.get('/MedicamentCategories/', {
      params: {idEstabelecimento: idEstabelecimento},
    });
    const data = response.data.response;
    setCategories(data);
  }

  //Produtos e suas categorias
  async function loadProducts(idEstabelecimento) {
    const response = await api.get('/Product', {params:{idEstabelecimento: idEstabelecimento, todos: todos}});
    const data = response.data.response;
    setProducts(data);
  }

  async function loadProductsMaisVendidos(idEstabelecimento) {
    try {
      const response = await api.get('/ProdsMaisVendidos/', {params:{idEstabelecimento: idEstabelecimento}});
      const data = response.data.response;
      if(data != ''){
        setStatusMaisVendidoProd(true)
      }
      setProdutosMaisVendidos(data);
      setTimeout(() => setVisible(true),1800);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadProductsOffers(idEstabelecimento, promocoesEstabelecimento){
    const response = await api.get('/Product', {
      params: {idEstabelecimento, promocoesEstabelecimento},
    });
    const data = response.data.response;
    setProductsOffers(data);
  }

  async function loadProductCategories(idEstabelecimento) {
    const response = await api.get('/ProductCategories/', {
      params: {idEstabelecimento},
    });
    const data = response.data.response;
    setProductCategories(data);
  }

  function navigateToTodos(idEstabelecimento) {
    navigation.navigate('Todos', {idEstabelecimento});
  }

  function navigateToDetailMed(medicament, nomeEstabelecimento) {
    navigation.navigate('DetailMed', {medicament, nomeEstabelecimento});
  }

  function navigateToDetailProd(product, nomeEstabelecimento) {
    navigation.navigate('DetailProd', {product, nomeEstabelecimento});
  }

  function navigateToSearchMedicamento(idEstabelecimento) {
    navigation.navigate('PesquisaMedicamento', {idEstabelecimento: idEstabelecimento});
  }
  return (
    <>
      <MeuHeader text={nomeEstabelecimento} />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.viewLogoFarma}>
            <ShimmerPlaceHolder
              style={styles.shimmerFoto}
              autoRun={true}
              visible={visible}
            >
              <Image style={styles.logoFarma} source={logo} />
            </ShimmerPlaceHolder>
          </View>
          <View style={styles.infosFarma}>
            <ShimmerPlaceHolder
              style={styles.shimmerDadosFarma}
              autoRun={true}
              visible={visible}
            >
              <View style={styles.nomeFarmaView}>
                <Text style={styles.nomeFarmaTxt}>
                  {nomeEstabelecimento} - {bairroLogEstabelecimento}
                </Text>
                <TouchableOpacity
                  style={styles.btMais}
                  onPress={() =>
                    navigateToDetailEstabelecimento(
                      idEstabelecimento,
                      nomeEstabelecimento,
                      cnpjEstabelecimento,
                      logEstabelecimento,
                      numLogEstabelecimento,
                      bairroLogEstabelecimento,
                      cidadeLogEstabelecimento,
                      ufLogEstabelecimento,
                      cepLogEstabelecimento,
                    )
                  }>
                  <Icon name="navigate-next" size={35} color="#23AFDB" />
                </TouchableOpacity>
              </View>
            </ShimmerPlaceHolder>
            <SearchBarHome press={() => navigateToSearchMedicamento(idEstabelecimento)}/>
            <ShimmerPlaceHolder
              style={styles.shimmerTaxa}
              autoRun={true}
              visible={visible}
            >
              <View style={styles.taxaEntregaView}>
                  <IconAwesome name="motorcycle" size={18} color="#23AFDB" />
                  <Text style={styles.taxaEntregaTxt}>
                    Taxa de entrega = R$ {taxaDeEntregaEstabelecimento},00
                  </Text>
              </View>
            </ShimmerPlaceHolder>
          </View>

          <Tabs
            tabStyle={{backgroundColor: 'white', borderWidth: 0}}
            tabBarPosition="top"
            locked={true}
            tabBarUnderlineStyle={{backgroundColor: '#23AFDB'}}
            initialPage={0}>
            {/* ABA DE MEDICAMENTOS*/}
            <Tab
              heading="Medicamentos"
              textStyle={{color: 'gray'}}
              activeTextStyle={{color: '#23AFDB'}}
              activeTabStyle={{backgroundColor: 'white'}}
              tabStyle={{backgroundColor: 'white'}}>
              <View style={[styles.containerTab, {backgroundColor: '#fff'}]}>
                <View style={styles.categoriasView}>
                  <Text style={styles.txtCategoria}>Categorias</Text>
                  <ScrollView
                    style={styles.scrollCategorias}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                        <FlatList
                          data={categories}
                          initialNumToRender
                          horizontal={true}
                          showsHorizontalScrollIndicator={false}
                          keyExtractor={categories =>
                            String(categories.idCategoriaMed)
                          }
                          style={styles.scrollMedic}
                          renderItem={({item: categories}) => (
                            <ShimmerPlaceHolder
                              style={styles.shimmerCategorias}
                              autoRun={true}
                              visible={visible}
                            >
                              <TouchableNativeFeedback
                                style={styles.btCategoria}
                                onPress={() =>
                                  navigateToCategoria(
                                    categories.nomeCategoria,
                                    idEstabelecimento,
                                  )
                                }>
                                <Text style={styles.txtBt}>
                                  {categories.nomeCategoria}
                                </Text>
                              </TouchableNativeFeedback>
                            </ShimmerPlaceHolder>
                          )}
                        />
                  </ScrollView>
                </View>
                <View style={styles.contScroll}>
                  <HeaderScroll title="Ofertas" icon="keyboard-arrow-right" size={26} />
                  <FlatList
                    data={medicamentsOffers}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={medicament =>
                      String(medicament.idMedicamento)
                    }
                    style={styles.scrollMedic}
                    renderItem={({item: medicament}) => (
                      <TouchableOpacity
                        onPress={() => navigateToDetailMed(medicament)}
                        style={styles.medicContainer}
                      >
                        <View style={styles.contImg}>
                          <ShimmerPlaceHolder
                            style={styles.shimmerImg}
                            autoRun={true}
                            visible={visible}
                          >
                            <Image source={Remedio} style={styles.imgMedic} />
                          </ShimmerPlaceHolder>
                        </View>
                        <View style={styles.contDesc}>
                          <View style={styles.descMedic}>
                            <ShimmerPlaceHolder
                            style={styles.shimmerText}
                            autoRun={true}
                            visible={visible}
                            >
                              <Text style={styles.nameMedic}>
                                {medicament.descMed}, {medicament.composicaoMed}
                              </Text>
                            </ShimmerPlaceHolder>  
                            
                            <ShimmerPlaceHolder
                              style={styles.shimmerText}
                              autoRun={true}
                              visible={visible}
                            >
                              <Text style={styles.nameLab}>
                                {medicament.nomeLaboratorio}
                              </Text>
                            </ShimmerPlaceHolder>

                            <ShimmerPlaceHolder
                              style={styles.shimmerText}
                              autoRun={true}
                              visible={visible}
                            >
                              <Text style={styles.dosagemMedic}>
                                {medicament.descDosagem}
                                {medicament.tipoDosagem}
                              </Text>
                            </ShimmerPlaceHolder>
                          </View>

                          <View style={styles.dadosCompra}>
                            <ShimmerPlaceHolder
                              style={styles.shimmerPreco}
                              autoRun={true}
                              visible={visible}
                            >
                              <Text style={styles.precoMedic}>
                                R$ {medicament.precoMed},00
                              </Text>
                            </ShimmerPlaceHolder>  
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
                {statusMaisVendido &&
                <View style={styles.contScroll}>
                  <HeaderScroll
                    title="Mais vendidos"
                    icon="keyboard-arrow-right"
                    size={26}
                  />
                  <FlatList
                    data={medicamentosMaisVendidos}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={medicamentosMaisVendidos =>
                      String(medicamentosMaisVendidos.idMedicamento)
                    }
                    style={styles.scrollMedic}
                    renderItem={({item: medicament}) => (
                      <TouchableOpacity
                        onPress={() => navigateToDetailMed(medicament)}
                        style={styles.medicContainer}>
                        <View style={styles.contImg}>
                          <ShimmerPlaceHolder
                            style={styles.shimmerImg}
                            autoRun={true}
                            visible={visible}
                          >
                            <Image source={Remedio} style={styles.imgMedic} />
                          </ShimmerPlaceHolder>
                        </View>
                        <View style={styles.contDesc}>
                          <View style={styles.descMedic}>

                            <ShimmerPlaceHolder
                              style={styles.shimmerText}
                              autoRun={true}
                              visible={visible}
                            >
                              <Text style={styles.nameMedic}>
                                {medicament.descMed}, {medicament.composicaoMed}
                              </Text>
                            </ShimmerPlaceHolder>

                            <ShimmerPlaceHolder
                              style={styles.shimmerText}
                              autoRun={true}
                              visible={visible}
                            >
                              <Text style={styles.nameLab}>
                                {medicament.nomeLaboratorio}
                              </Text>
                            </ShimmerPlaceHolder>

                            <ShimmerPlaceHolder
                              style={styles.shimmerText}
                              autoRun={true}
                              visible={visible}
                            >
                              <Text style={styles.dosagemMedic}>
                                {medicament.descDosagem}
                                {medicament.tipoDosagem}
                              </Text>
                            </ShimmerPlaceHolder>
                          </View>

                          <View style={styles.dadosCompra}>
                            <ShimmerPlaceHolder
                              style={styles.shimmerPreco}
                              autoRun={true}
                              visible={visible}
                            >
                              <Text style={styles.precoMedic}>
                                R$ {medicament.precoMed},00
                              </Text>
                            </ShimmerPlaceHolder>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
                }

                <View style={styles.contScroll}>
                  <HeaderScroll
                    title="Todos"
                    icon="keyboard-arrow-right"
                    size={26}
                    function={() => navigateToTodos(idEstabelecimento)}
                  />
                  <FlatList
                    data={medicaments}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={medicament =>
                      String(medicament.idMedicamento)
                    }
                    style={styles.scrollMedic}
                    renderItem={({item: medicament}) => (
                      <TouchableOpacity
                        onPress={() => navigateToDetailMed(medicament)}
                        style={styles.medicContainer}>
                        <View style={styles.contImg}>
                          <ShimmerPlaceHolder
                            style={styles.shimmerImg}
                            autoRun={true}
                            visible={visible}
                          >
                            <Image source={Remedio} style={styles.imgMedic} />
                          </ShimmerPlaceHolder>
                        </View>
                        <View style={styles.contDesc}>
                          <View style={styles.descMedic}>
                            <ShimmerPlaceHolder
                              style={styles.shimmerText}
                              autoRun={true}
                              visible={visible}
                            >
                              <Text style={styles.nameMedic}>
                                {medicament.descMed}, {medicament.composicaoMed}
                              </Text>
                            </ShimmerPlaceHolder>

                            <ShimmerPlaceHolder
                              style={styles.shimmerText}
                              autoRun={true}
                              visible={visible}
                            >
                              <Text style={styles.nameLab}>
                                {medicament.nomeLaboratorio}
                              </Text>
                            </ShimmerPlaceHolder>

                            <ShimmerPlaceHolder
                              style={styles.shimmerText}
                              autoRun={true}
                              visible={visible}
                            >
                              <Text style={styles.dosagemMedic}>
                                {medicament.descDosagem}
                                {medicament.tipoDosagem}
                              </Text>
                            </ShimmerPlaceHolder>
                          </View>

                          <View style={styles.dadosCompra}>
                            <ShimmerPlaceHolder
                              style={styles.shimmerPreco}
                              autoRun={true}
                              visible={visible}
                            >
                              <Text style={styles.precoMedic}>
                                R$ {medicament.precoMed},00
                              </Text>
                            </ShimmerPlaceHolder>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </Tab>

            {/* ABA DE PRODUTOS*/}
            <Tab
              heading="Outros"
              textStyle={{color: 'gray'}}
              activeTextStyle={{color: '#23AFDB'}}
              activeTabStyle={{backgroundColor: 'white'}}
              tabStyle={{backgroundColor: 'white'}}>
              <View style={[styles.containerTab, {backgroundColor: '#fff'}]}>
                <View style={styles.categoriasView}>
                  <Text style={styles.txtCategoria}>Categorias</Text>
                  <ScrollView
                    style={styles.scrollCategorias}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <FlatList
                      data={productCategories}
                      initialNumToRender
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      keyExtractor={productCategories =>
                        String(productCategories.idCategoria)
                      }
                      style={styles.scrollMedic}
                      renderItem={({item: productCategories}) => (
                        <TouchableNativeFeedback
                          style={styles.btCategoria}
                          onPress={() =>
                            navigateToCategoriaProd(
                              productCategories.nomeCategoria,
                              idEstabelecimento,
                            )
                          }>
                          <Text style={styles.txtBt}>
                            {productCategories.nomeCategoria}
                          </Text>
                        </TouchableNativeFeedback>
                      )}
                    />
                  </ScrollView>
                </View>

                <View style={styles.contScroll}>
                  <HeaderScroll title="Ofertas" icon="keyboard-arrow-right" size={26} />
                  <FlatList
                    data={productsOffers}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={products => String(products.idProduto)}
                    style={styles.scrollMedic}
                    renderItem={({item: products}) => (
                      <TouchableOpacity
                        style={styles.medicContainer}
                        onPress={() =>
                          navigateToDetailProd(products, nomeEstabelecimento)
                        }>
                        <View style={styles.contImg}>
                          <Image source={Remedio} style={styles.imgMedic} />
                        </View>
                        <View style={styles.contDesc}>
                          <View style={styles.descMedic}>
                            <Text style={styles.nameMedic}>
                              {products.nomeProduto}
                            </Text>
                            <Text style={styles.nameLab}>
                              {products.nomeFabricante}
                            </Text>
                            <Text style={styles.dosagemMedic}>
                              {products.qtdMl} {products.tipoDosagem}
                            </Text>
                          </View>
                          <View style={styles.dadosCompra}>
                            <Text style={styles.precoMedic}>
                              R$ {products.precoProduto},00
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
                {statusMaisVendidoProd &&
                  <View style={styles.contScroll}>
                  <HeaderScroll title="Mais vendidos" icon="keyboard-arrow-right" size={26} />
                  <FlatList
                    data={produtosMaisVendidos}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={produtosMaisVendidos => String(produtosMaisVendidos.idProduto)}
                    style={styles.scrollMedic}
                    renderItem={({item: products}) => (
                      <TouchableOpacity
                        style={styles.medicContainer}
                        onPress={() =>
                          navigateToDetailProd(products, nomeEstabelecimento)
                        }>
                        <View style={styles.contImg}>
                          <Image source={Remedio} style={styles.imgMedic} />
                        </View>
                        <View style={styles.contDesc}>
                          <View style={styles.descMedic}>
                            <Text style={styles.nameMedic}>
                              {products.nomeProduto}
                            </Text>
                            <Text style={styles.nameLab}>
                              {products.nomeFabricante}
                            </Text>
                            <Text style={styles.dosagemMedic}>
                              {products.qtdMl} {products.tipoDosagem}
                            </Text>
                          </View>
                          <View style={styles.dadosCompra}>
                            <Text style={styles.precoMedic}>
                              R$ {products.precoProduto},00
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>}

                <View style={styles.contScroll}>
                  <HeaderScroll title="Todos" icon="keyboard-arrow-right" size={26} />
                  <FlatList
                    data={products}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={products => String(products.idProduto)}
                    style={styles.scrollMedic}
                    renderItem={({item: products}) => (
                      <TouchableOpacity
                        style={styles.medicContainer}
                        onPress={() =>
                          navigateToDetailProd(products, nomeEstabelecimento)
                        }>
                        <View style={styles.contImg}>
                          <Image source={Remedio} style={styles.imgMedic} />
                        </View>
                        <View style={styles.contDesc}>
                          <View style={styles.descMedic}>
                            <Text style={styles.nameMedic}>
                              {products.nomeProduto}
                            </Text>
                            <Text style={styles.nameLab}>
                              {products.nomeFabricante}
                            </Text>
                            <Text style={styles.dosagemMedic}>
                              {products.qtdMl} {products.tipoDosagem}
                            </Text>
                          </View>
                          <View style={styles.dadosCompra}>
                            <Text style={styles.precoMedic}>
                              R$ {products.precoProduto},00
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </Tab>
          </Tabs>
        </View>
      </ScrollView>
    </>
  );
}
