import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    flex: 1,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  subTitle: {
    fontSize: 18,
  },

  subTitleBold: {
    fontSize: 16,
    fontWeight: '700',
  },

  subTitlePgto: {
    fontSize: 16,
  },

  subTitleMaiorBold: {
    fontSize: 18,
    fontWeight: '700',
  },

  cont: {
    fontSize: 16,
  },

  contEntrega: {
    width: '95%',
    height: 'auto',
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#ACACAC',
  },

  local: {
    width: '70%',
  },

  contProd: {
    width: '100%',
    height: 'auto',
    marginTop: 2,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#ACACAC',
  },

  imgProd: {
    width: 72,
    height: 82,
  },

  dadosProd: {
    width: '75%',
  },

  dadosFarma: {
    flexDirection: 'row',
  },

  quant: {
    marginTop: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  controls: {
    flexDirection: 'row',
    width: 70,
    justifyContent: 'space-around',
  },

  contPedido: {
    width: '100%',
    height: 140,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 2,
    justifyContent: 'space-between',
    alignContent: 'space-between',
    flexWrap: 'wrap',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#ACACAC',
  },

  contCupom: {
    width: '95%',
    height: 'auto',
    marginTop: 2,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#ACACAC',
  },

  dadosCupom: {
    width: '70%',
  },

  contPagto: {
    width: '95%',
    height: 'auto',
    marginTop: 2,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  dadosPagto: {
    width: '70%',
  },

  btPedir: {
    width: 170,
    height: 40,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#23AFDB',
  },

  btText: {
    color: '#fff',
    fontSize: 17,
  },

  container2: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  nlTxt: {
    fontSize: 20,
    color: '#666',
    textAlign: 'center',
    fontWeight: 'bold',
    width: 280,
  },

  btLogar: {
    backgroundColor: '#23AFDB',
    width: 155,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container2:{
    height: '100%', 
    width: '100%',
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'white'
},

nlTxt:{
    fontSize: 20, color: '#666', 
    textAlign: 'center', 
    fontWeight: 'bold',
    width: 280
},

btLogar:{
    backgroundColor: '#23AFDB', 
    width: 155, 
    height: 40, 
    borderRadius: 10, 
    justifyContent: 'center', 
    alignItems: 'center'
},

txtLogar:{
    color: '#fff', 
    fontSize: 17, 
    fontWeight: 'bold'
},

gif:{
    width: 130,
    height: 130,
    marginTop: 10,
    marginBottom: 10
}
});
