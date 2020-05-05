import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height ,
    paddingHorizontal: 32,
    backgroundColor: '#fff',
  },  

  contResult:{
    width: '100%',
    height: 125,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,

    borderWidth: 0,
    shadowColor: '#acacac',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,


  },

  imgProd: {
    width: 75,
    height: 75,
  },

  contDesc: {
    width: '45%',
    height: 65,
    justifyContent: 'space-between',
    //backgroundColor: 'red',
  },

  title:{
    fontSize: 18,
    fontWeight: 'normal',
    color: '#112630'
  },

  descFarma: {
    flexDirection: 'row',
    alignItems:'center',
  },

  imgFarma: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 5,
  },

  nameFarma: {
    fontSize: 14,
    color: '#666'
  },

  contPreco: {
    width: '25%',
    height: 65,
    justifyContent: 'flex-end',
    alignItems: 'center', 
    //backgroundColor: 'blue',
  },

  textAnterior: {
    fontSize: 14,
    color: '#17303C',
    textDecorationLine: "line-through",
  },

  textPreco: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F9433',
  },

});