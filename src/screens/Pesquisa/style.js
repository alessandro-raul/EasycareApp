import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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