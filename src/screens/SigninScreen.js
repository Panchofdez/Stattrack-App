import React from 'react';
import {StyleSheet, View, SafeAreaView, Image, ScrollView} from 'react-native';
import {Text, Button} from 'react-native-elements';
import { NavigationEvents} from 'react-navigation';
import {useDispatch} from 'react-redux';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import {clearErrorMessage} from '../store/actions/errors';

const SigninScreen = ({navigation})=>{
	const dispatch = useDispatch();
	return (
		<SafeAreaView style={styles.container}>
			<NavigationEvents onWillFocus={()=>dispatch(clearErrorMessage())} />
			<ScrollView centerContent={true} contentContainerStyle={{paddingTop:125}}>
				<AuthForm btnText="Sign In" type="signin"/>
				<NavLink text='Sign up instead' navigation={navigation} route='Signup'/>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'white',
		justifyContent:'center'
	}
})


export default SigninScreen;