import React from 'react';
import {View, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Loading = ()=>{
	return (
		<View style={styles.container}> 
			<ActivityIndicator size="large" color='#02a1e6' />	
		</View>

	)
}



const styles=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#fff',
		justifyContent:'center',
		alignItems:'center'
	}
});



export default Loading;