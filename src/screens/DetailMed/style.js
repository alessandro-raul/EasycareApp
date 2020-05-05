import { StyleSheet, Dimensions } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    //height: Dimensions.get('window').height,
    height: '93%',
    paddingHorizontal: 32,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',  
  },  

  contImg: {
    width: '100%',
    height: '35%',
    alignItems: 'center',
    //justifyContent: 'center',
    //backgroundColor: '#333',   
  },

  imgMed: {
    width: 180,
    height: 220,
  },

  descMed: {
    width: '100%',
    height: 220,
    paddingVertical: 40,
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(70,70,70,0.3)',
    backgroundColor: '#fff', 
  },


  title: {
    color: '#17303C',
    fontSize: 24,  
  },
  
  descFarma: {
    color: '#17303C',
    fontSize: 16,  
  },

  nameFarm: {
    fontWeight: 'bold',  
  },

  precoMed: {
    color: '#666',  
    fontSize: 16,
    textDecorationLine: "line-through",
  },

  precoPromo: {
    color: '#1F9433', 
    fontSize: 24,     
  },

  btComprar: {
    width: 190,
    height: 40,
    marginTop: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#23AFDB',  
  },

  textBtComprar: {
    color: '#fff',
    fontSize: 18,  
  },

  btAdd:{
    width: 190,
    height: 35,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#23AFDB', 
    backgroundColor: '#fff', 
  },

  textBtAdd: {
    color: '#17303C',  
    fontSize: 15,   
  },

});