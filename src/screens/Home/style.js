import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    paddingLeft: 32,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },

  contSearch: {
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    width: "95%"
  },

  contScroll: {
    height: 230,
    justifyContent: 'center',
    alignItems: 'center',  
  },
  
  scrollMedic: {  
    width: '100%',
  },

  medicContainer: {
    width: 130,
    marginRight: 10,
    padding: 7,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(70,70,70,0.3)',
    //backgroundColor: 'red',  
  },
  
  contImg: {
    width: '80%',
    height: '65%',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#fff',  
  },

  imgMedic: {
    width: 65,
    height: 65,
  },

  contDesc: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: 'rgba(70,70,70,0.3)',
    //backgroundColor: 'blue'
  },

  contFarma: {
    width: 30,
    height: 30,
    padding: 0,
    borderRadius: 5,
    alignItems: 'center',
    //backgroundColor: 'green'  
  },
  
  imgFarma: {
    marginLeft: 15,
    marginRight: 30,
    width: 25,
    height: 25,
    borderRadius: 20,  
  },

  descMedic: {
    width: 100,
    marginLeft: '15%',
    //backgroundColor: 'yellow',
  },

  nameMedic: {
    fontSize: 15, 
    color: '#707070', 
  }, 

  precoMedic: {
    fontSize: 14,
    color: '#1F9433'  
  },

  localizacao:{
    flexDirection:'row',
    width: '70%',
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
  }


});