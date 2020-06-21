import React from 'react';
import {useDispatch} from 'react-redux';
import {ScrollView, SafeAreaView, StyleSheet, View, TouchableOpacity,Image} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {DrawerItems} from 'react-navigation-drawer';
import {signout} from '../store/actions/auth'; 
import {MaterialCommunityIcons} from '@expo/vector-icons';

const CustomDrawerComponent = (props) => {
	const dispatch= useDispatch();
	return (
		<SafeAreaView style={{flex:1, marginTop:50}}>
			<ScrollView>
				<View style={{height:150, backgroundColor:'white', alignItems:'center'}}>
					<Image 
						source={require('../../assets/stlogo3.png')}
						style={{height:120,width:120, borderRadius:60}}
					/>
				</View>
				<DrawerItems {...props} />
				<TouchableOpacity onPress={()=>dispatch(signout())}>
					<View style={{flexDirection:'row', alignItems:'center', marginTop:8}}>
						<MaterialCommunityIcons name='logout' size={25} style={{marginLeft:15}} color='#737272'/>
						<Text style={{fontWeight:'bold', marginLeft:32}}>
							Logout
						</Text>
					</View>
				</TouchableOpacity>
			</ScrollView>
			
		</SafeAreaView>
		)
	}

const styles=StyleSheet.create({});


export default CustomDrawerComponent;
