import {StyleSheet, Dimensions} from 'react-native';

export default styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    //height: Dimensions.get('window').height,
    height: '100%',
    //paddingLeft: 32,
    backgroundColor: '#fff',  
  },

  /*contBanner: {  
    width: '100%',
    height: 200,
    alignItems: 'center',
    paddingHorizontal: 32,
    //borderBottomWidth:1,
    //borderColor: 'rgba(70,70,70,0.3)',
    backgroundColor: "#fff",  */
 

  viewLogoFarma:{
      justifyContent: 'center',
      alignItems: 'center',
      height: 95,
  },

  logoFarma: {
    width: 60,
    height: 60,
    borderRadius: 50
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

  nomeFarmaView:{
    width: '100%',
    paddingHorizontal: 10,
    minHeight: 30,
    flexDirection: 'row',
    marginBottom: '4%'
  },

  nomeFarmaTxt: {
    fontSize: 20,
    width: '85%',
    paddingTop: 3,
    fontWeight: 'bold', 
    color: 'grey'
  },

  btMais:{
    width:40,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '8%'
  },

  taxaEntregaView: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row'
  },

  taxaEntregaTxt: {
    fontSize: 15,
    color: 'grey',
    marginLeft: '3%'
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
    flex:1,
    marginTop: 40,
    alignItems: "center",
    backgroundColor: '#fff',  
  },

  subTitle: {
    fontSize: 18,
    color: "#3977A0",
  },

  containerTab:{
      flex: 1,
      alignItems: 'center'
  },


  descMedic: {
    marginLeft: '5%',
    //backgroundColor: 'yellow',
  },

  contScroll: {
    width: '100%',
    marginTop: '1%',
    
    height: 230,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  scrollMedic: {  
    width: '100%',
  },

  medicContainer: {
    width: 120,
    height: '100%',
    marginLeft: 22,
    padding: 7,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(70,70,70,0.3)',
    //backgroundColor: 'red',  
  },

  imgMedic: {
    width: 75,
    height: 75,
  },

  
  contImg: {
    width: '80%',
    height: '65%',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#fff',  
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
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: 'rgba(70,70,70,0.3)',
    //backgroundColor: 'blue'
  },
  nameMed: {
    textAlign: 'center',
    
  },

  nameMedic: {
    fontSize: 14
  },

  precoMedic: {
    color: 'green'
  },

  precoMed: {
    textAlign: 'center',
  },
});