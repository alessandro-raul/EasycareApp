import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import MeuHeader from '../componentes/Header';
import api from '../services/api';
import Remedio from '../../assets/imgs/remedio.png';
import Drogaria from '../../assets/imgs/drogariasp.png';

export default function Categoria({navigation}) {
  const [products, setProducts] = useState([]);
  const route = useRoute();
  navigation = useNavigation();
  const nomeCategoria = route.params.nomeCategoria;
  const idEstabelecimento = route.params.idEstabelecimento;

  useEffect(() => {
    loadProducts(idEstabelecimento, nomeCategoria);
  }, []);

  async function loadProducts(idEstabelecimento, nomeCategoria) {
    const response = await api.get('/Product', {
      params: {
        idEstabelecimento: idEstabelecimento,
        nomeCategoria: nomeCategoria,
      },
    });
    const data = response.data.response;
    setProducts(data);
  }

  function navigateToDetailProd(product, nomeEstabelecimento) {
    navigation.navigate('DetailProd', {product, nomeEstabelecimento});
  }

  const largura = Dimensions.get('screen').width;
  var numColumns;

  if (largura >= 400) {
    numColumns = 3;
  } else {
    numColumns = 2;
  }

  return (
    <>
      <MeuHeader text={nomeCategoria} />
      <View style={styles.container}>
        <View style={styles.contScroll}>
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
                    <Text style={styles.nameMedic}>{products.nomeProduto}</Text>
                    <Text style={styles.nameLab}>
                      {products.nomeFabricante}
                    </Text>
                    <Text style={styles.dosagemMedic}>{products.qtdMl}</Text>
                  </View>
                  <View style={styles.dadosCompra}>
                    <Text style={styles.precoMedic}>
                    {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(products.precoProduto)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  contScroll: {
    flexDirection: 'row',
    //backgroundColor: 'green',
    alignItems: 'center',
    width: '100%',
  },

  scrollMedic: {
    height: '100%',
  },

  medicContainer: {
    width: 130,
    height: 330,
    marginLeft: 23,
    marginTop: 22,
    padding: 7,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(70,70,70,0.3)',
    //backgroundColor: 'red',
  },

  contImg: {
    width: '90%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#333',
  },

  imgMedic: {
    width: 65,
    height: 65,
  },

  contDesc: {
    width: '90%',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: 'rgba(70,70,70,0.3)',
    //backgroundColor: 'blue'
  },

  dadosCompra: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    //backgroundColor:'#fff'
  },

  imgFarma: {
    width: 25,
    height: 25,
    borderRadius: 20,
  },

  descMedic: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 10,
    //backgroundColor: 'yellow',
  },

  nameMedic: {
    fontSize: 14,
    color: '#707070',
  },

  nameLab: {
    fontWeight: '700',
    fontSize: 14,
    color: '#707070',
  },

  dosagemMedic: {
    fontSize: 14,
    color: '#707070',
  },

  precoMedic: {
    fontSize: 14,
    color: '#1F9433',
  },
});
