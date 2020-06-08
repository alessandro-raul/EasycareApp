import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  container: {
    width: '100%',
    height: Dimensions.get('window').height,
    //paddingLeft: 32,
    backgroundColor: '#fff',
  },

  contSearch: {
    marginTop: '5%',
    paddingLeft: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: "95%"
  },

  contScroll2: {
    height: 230,
    width: '100%',
    marginTop: '1%',
    justifyContent: 'center',
    alignItems: 'center',  
  },

  medicContainer2: {
    width: 130,
    marginLeft:22,
    padding: 7,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(70,70,70,0.3)',
    //backgroundColor: 'red',  
  },
  

  /*Card Scroll Ofertas*/
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
    marginLeft:22,
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(70,70,70,0.3)',
    //backgroundColor: 'red',  
  },
  
  contImg: {
    width: 100,
    height: 100,
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
    width:'100%',
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
    color: '#1F9433'  
  },

  /*fim do card*/

  localizacao:{
    flexDirection:'row',
    width: '70%',
    paddingLeft: 30, 
    paddingTop: 20,
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  viewLocalizacao:{
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0, 0.20)'
  },

  txtLocalizacao:{
    marginLeft: '2%',
    fontSize: 15.4,
    marginTop: "1%",
    color: 'gray'
    //textDecorationLine:'underline'
  },

  farmaContainer: {
    width: '100%',
    height: 85,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(70,70,70, 0.2)',
    //backgroundColor: '#333',
  },

  viewImg: {
    width: 100,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'red',
  },

  ImgFarma: {
    width: 40,
    height: 40,
    borderRadius: 25,
  },

  viewDados: {
    flex: 1,
    height: '100%',
    padding: 16,
    justifyContent: 'center',
    //backgroundColor: 'green',
  },

  title: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(70,70,70, 0.8)',
  },

  subTitle: {
    fontSize: 13,
    color: 'rgba(70,70,70, 0.5)',
  },

  shimmerCard: {
    width: 130,
    height: "100%",
    borderRadius: 5,
    marginLeft:22, 
    backgroundColor: '#333',
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
    width: '72%',
    borderRadius: 5,
    marginLeft: 5,

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

});