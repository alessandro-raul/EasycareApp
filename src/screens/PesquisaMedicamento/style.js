import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#fff',
  },  

  containerSearch: {
    width:'100%',
    height: 60,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:"#fff",
    elevation: 1,
    shadowOffset: { width: 3, height: 1 },
    shadowColor: '#3977A0',
    shadowOpacity: 0.3,
  },

  containerInput: {
    width: '100%',
    height: 45,
    alignItems:"center",
    flexDirection: "row",
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#f8f8f8',
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16
  },

  scrollMedic: {
    height: '100%',
  },
 
  medicContainer: {
    width: 130,
    height: 330,
    marginLeft: 11.5,
    marginRight: 11.5,
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