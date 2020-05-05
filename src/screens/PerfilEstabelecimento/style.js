import {StyleSheet, Dimensions} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    //height: Dimensions.get('window').height,
    height: '100%',
    //paddingLeft: 32,
    backgroundColor: '#fff',  
  },

  contBanner: {  
    width: '100%',
    height: 200,
    alignItems: 'center',
    paddingHorizontal: 32,
    //borderBottomWidth:1,
    //borderColor: 'rgba(70,70,70,0.3)',
    backgroundColor: "#fff",  
  },

  imgBanner: {
    flex: 1,  
  },

  cont: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 32,
    borderTopWidth: 1,
    borderColor: 'rgba(70,70,70,0.3)', 
    backgroundColor: '#fff',  
  },

  infoFarm: {
    width: '100%',
    height: 250,
    marginTop: -30,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 30,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'rgba(70,70,70,0.3)',
    backgroundColor: '#fff',   
  },

  nameFarm: {
    color: '#3977A0',
    fontSize: 16,  
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

  contOferta: {
    flex:1,
    marginTop: 40,
    alignItems: "center",
    backgroundColor: '#fff',  
  },

  subTitle: {
    fontSize: 18,
    color: "#3977A0",
  },

  contScroll: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  medContainer: {
    width: 130,
    height: 155,
    marginRight: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(70,70,70,0.3)',
    backgroundColor: '#fff',
  },

  imgMed:{
    width: 75,
    height: 80,
  },

  contDesc: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameMed: {
    textAlign: 'center',
  },

  precoMed: {
    textAlign: 'center',
  },
});