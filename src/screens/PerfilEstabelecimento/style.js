import {StyleSheet, Dimensions} from 'react-native';

export default (styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: '100%',
    backgroundColor: '#fff',
    paddingBottom: 10
  },

  viewLogoFarma: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 95,
  },

  logoFarma: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },

  cont: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 32,
    borderTopWidth: 1,
    borderColor: 'rgba(70,70,70,0.3)',
    backgroundColor: '#fff',
  },

  infosFarma: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },

  nomeFarmaView: {
    width: '100%',
    paddingHorizontal: 10,
    minHeight: 30,
    flexDirection: 'row',
    marginBottom: '4%',
  },

  nomeFarmaTxt: {
    fontSize: 20,
    width: '85%',
    paddingTop: 3,
    fontWeight: 'bold',
    color: 'grey',
  },

  btMais: {
    width: 40,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '8%',
  },

  taxaEntregaView: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },

  taxaEntregaTxt: {
    fontSize: 15,
    color: 'grey',
    marginLeft: '3%',
  },

  btLigar: {
    width: 150,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#23AFDB',
  },

  textBtLigar: {
    color: '#fff',
    fontSize: 16,
  },

  imgFarma: {
    marginLeft: '8%',
    width: 30,
    height: 30,
    borderRadius: 5,
  },

  contOferta: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  categoriasView: {
    width: '100%',
    paddingTop: 20,
    marginBottom: 4,
  },

  scrollCategorias: {
    marginTop: '3%',
  },

  txtCategoria: {
    color: '#666',
    //textAlign: 'center',
    paddingHorizontal: 29,
    fontSize: 18,
  },

  btCategoria: {
    marginLeft: 22,
    backgroundColor: '#23AFDB',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 120,
    borderRadius: 5,
  },

  txtBt: {
    color: '#fff',
    paddingHorizontal: 10,
    fontSize: 15,
  },

  subTitle: {
    fontSize: 18,
    color: '#3977A0',
  },

  containerTab: {
    flex: 1,
    alignItems: 'center',
  },

  contScroll: {
    height: 330,
    width: '100%',
    marginTop: '1%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollMedic: {
    width: '100%',
  },

  medicContainer: {
    width: 130,
    height: '100%',
    marginLeft: 22,
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
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

  shimmerFoto: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },

  shimmerDadosFarma: {
    width:'100%',
    marginBottom: 20,
    height: 25,
    borderRadius: 10
  },

  shimmerTaxa: {
    width: '60%',
    marginTop: 20,
    marginBottom: 20,
    height: 20,
    borderRadius: 10,
  },

  shimmerCategorias: {
    width: '85%',
    height: 34,
    paddingHorizontal: 16,
    borderRadius: 45,
  },

  shimmerImg: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },

  shimmerText: {
    width: '100%',
    borderRadius: 5,
  },

  shimmerPreco: {
    width: '100%',
    borderRadius: 5,
  },

  shimmerImgFarma: {
    width: 25,
    height: 25,
    borderRadius: 25,
  },

  shimmerTextEstabelecimento: {
    width: '90%',
    height: 14,
    marginTop: 5,
  },

  shimmerImgFarm: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },

}));
