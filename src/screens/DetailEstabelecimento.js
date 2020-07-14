import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import MeuHeader from '../componentes/Header';
import logo from '../../assets/imgs/drogariasp.png';
import api from '../services/api';
import IconFeather from 'react-native-vector-icons/Feather';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoder';3

import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

export default function PerfilEstabelecimento({navigation}) {
  navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    pegarTelefone();
    pegarEmail();
    pegarCoordenadas();
  }, []);

  const idEstabelecimento = route.params.idEstabelecimento;
  const nomeEstabelecimento = route.params.nomeEstabelecimento;
  const cnpjEstabelecimento = route.params.cnpjEstabelecimento;
  const logEstabelecimento = route.params.logEstabelecimento;
  const numLogEstabelecimento = route.params.numLogEstabelecimento;
  const bairroLogEstabelecimento = route.params.bairroLogEstabelecimento;
  const cidadeLogEstabelecimento = route.params.cidadeLogEstabelecimento;
  const ufLogEstabelecimento = route.params.ufLogEstabelecimento;
  const cepLogEstabelecimento = route.params.cepLogEstabelecimento;
  const [numFoneEstabelecimento, setNumFoneEstabelecimento] = useState();
  const [emailEstabelecimento, setEmailEstabelecimento] = useState();
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [streetName, setStreetName] = useState('');

  async function pegarCoordenadas() {
    try {
      const res = await Geocoder.geocodeAddress(
        logEstabelecimento + numLogEstabelecimento,
      );
      res.map(item => {
        setLatitude(item.position.lat);
        setLongitude(item.position.lng);
        setStreetName(item.streetName);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function pegarTelefone() {
    const response = await api.get('/EstablishmentPhone/', {
      params: {idEstabelecimento},
    });
    const data = response.data.response;
    data.map(item => {
      setNumFoneEstabelecimento(item.numFoneEstabelecimento);
    });
  }

  async function pegarEmail() {
    const response = await api.get('/EstablishmentEmail/', {
      params: {idEstabelecimento},
    });
    const data = response.data.response;
    data.map(item => {
      setEmailEstabelecimento(item.emailEstabelecimento);
    });
  }

  function abrirTelefone() {
    Linking.openURL(`tel:${numFoneEstabelecimento}`);
  }

  function abrirEmail() {
    Linking.openURL(`mailto:${emailEstabelecimento}`);
  }

  return (
    <>
      <MeuHeader text="Detalhes" />
      <View style={styles.container}>
        <Image style={styles.logoFarma} source={logo} />
        <Text style={styles.nomeFarmaTxt}>{nomeEstabelecimento}</Text>
        <Text style={styles.logFarmaTxt}>
          {logEstabelecimento}, {numLogEstabelecimento} -{' '}
          {bairroLogEstabelecimento}, {cidadeLogEstabelecimento} -{' '}
          {ufLogEstabelecimento}
        </Text>
        <View style={styles.emailView}>
          <IconFeather name="mail" size={20} color="#23AFDB" />
          <Text style={styles.numFoneTxt}>{emailEstabelecimento}</Text>
        </View>
        <View style={styles.numFoneView}>
          <IconFeather name="phone" size={20} color="#23AFDB" />
          <Text style={styles.numFoneTxt}>{numFoneEstabelecimento}</Text>
        </View>
        <View style={styles.btsContainer}>
          <TouchableOpacity style={styles.btFone} onPress={abrirTelefone}>
            <IconFeather name="phone" size={18} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btMail} onPress={abrirEmail}>
            <IconFeather name="mail" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.mapa}>
          <MapView
            style={styles.map}
            loadingEnabled={true}
            region={{
              latitude,
              longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            <Marker
              title={nomeEstabelecimento + ' - ' + bairroLogEstabelecimento}
              description={streetName + ', ' + numLogEstabelecimento}
              coordinate={{
                latitude,
                longitude,
              }}
            />
          </MapView>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },

  nomeFarmaTxt: {
    fontSize: 20,
    paddingTop: 3,
    fontWeight: 'bold',
    color: 'grey',
  },

  logFarmaTxt: {
    fontSize: 16,
    width: '85%',
    textAlign: 'center',
    paddingTop: 3,
    fontWeight: 'bold',
    color: 'grey',
  },

  numFoneTxt: {
    fontSize: 16,
    marginLeft: 5,
    paddingBottom: 4,
    paddingTop: 3,
    color: 'grey',
  },

  logoFarma: {
    marginTop: '5%',
    marginBottom: '3%',
    width: 60,
    height: 60,
    borderRadius: 50,
  },

  numFoneView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  emailView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '3%',
    justifyContent: 'center',
  },

  btFone: {
    backgroundColor: '#23AFDB',
    borderRadius: 100,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btMail: {
    backgroundColor: '#23AFDB',
    borderRadius: 100,
    marginLeft: '4%',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btsContainer: {
    marginTop: '4%',
    flexDirection: 'row',
  },

  map: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  mapa: {
    marginTop: '5%',
    width: '100%',
    height: '65%',
  },
});
