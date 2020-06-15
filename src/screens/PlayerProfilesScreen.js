import React from 'react';
import {View, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import {Text, Button, ListItem} from 'react-native-elements';
import {useSelector} from 'react-redux';
import {FontAwesome, AntDesign} from '@expo/vector-icons';


const PlayerProfilesScreen = ({navigation})=>{
	const playerProfiles = useSelector((state)=>state.players);
	return (
		<SafeAreaView style={styles.container}>
			{playerProfiles.length === 0 && (
				<TouchableOpacity activeOpacity={0.85}>
					<ListItem 
						title='No player profiles'
						leftIcon={<FontAwesome name='user-circle' size={35}/>}
						containerStyle={styles.liContainer}
						chevron

					/>
				</TouchableOpacity>

			)}
			<FlatList
				data={playerProfiles}
				keyExtractor={(p)=>p.name}
				renderItem={({item})=>{
					return(
						<TouchableOpacity onPress={()=>navigation.navigate('Profile', {profile:item})} activeOpacity={0.85}>
							<ListItem 
								title={item.name}
								subtitle={`${item.position} / ${item.sport}`}
								leftIcon={<FontAwesome name='user-circle' size={35}/>}
								containerStyle={styles.liContainer}
								chevron

							/>
						</TouchableOpacity>
					)
				}}
			/>
			<View style={{flexDirection:'row', justifyContent:'flex-end'}}>
				<TouchableOpacity onPress={()=>navigation.navigate('CreateProfile')}>
					<AntDesign name='pluscircle' size={65} style={{margin:20}}color='#02a1e6'/>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}


const styles= StyleSheet.create({
	container:{
		flex:1,
		margin:0,
		padding:0,
		backgroundColor:'#f9f9f9'
	},
	liContainer:{
		borderRadius:25, 
		marginHorizontal:10, 
		marginTop:10,
		marginBottom:2,
		shadowColor: 'rgba(0,0,0, .4)', // IOS
	    shadowOffset: { height: 1, width: 1 }, // IOS
	    shadowOpacity: 1, // IOS
	    shadowRadius: 1, //IOS
	    backgroundColor: '#fff',
	    elevation: 3, // Android
	}
})



export default PlayerProfilesScreen;