import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {Text} from 'react-native-elements';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const PercentCard = ({percent, title})=>{
	let color='red'

	if(percent>=50){
		color='#19e02d'
	}
	return(
		<View style={styles.card}>
			<Text h4 h4Style={{fontSize:22}} style={{backgroundColor: color, color: '#fff', borderRadius:100, padding:10, alignSelf:'center'}}>{percent} %</Text>
			<Text style={{fontSize:16, textAlign:'center', marginVertical:5}} >{title}</Text>
		</View>
	)
} 

const styles = StyleSheet.create({
	card:{
		width:width*0.31,
		borderRadius:25,
		marginVertical:5,
		backgroundColor:'#fff',
		padding:10,
		shadowColor: 'rgba(0,0,0, .4)', // IOS
	    shadowOffset: { height: 1, width: 1 }, // IOS
	    shadowOpacity: 1, // IOS
	    shadowRadius: 1, //IOS
	    backgroundColor: '#fff',
	    elevation: 3, // Android

	}

})



export default PercentCard;