import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Header = ({navigation, title})=>{
	return (
		<View style={styles.header}>
			<MaterialIcons 
				name='menu' 
				size={30} 
				style={styles.icon} 
				onPress={()=>navigation.openDrawer()}
			/>
			<View>
				<Text style={styles.headerText}>{title}</Text>
			</View>
		</View>

	)
}


const styles = StyleSheet.create({
	header:{
		height:'100%',
		width:'100%',
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center'
	}, 
	headerText:{
		fontWeight:'bold',
		letterSpacing:1,
		fontSize:20,
		color:'#02a1e6'
	},
	icon:{
		position:'absolute',
		left:5,
		color:'#02a1e6'
	}
})



export default Header;