import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {Text, Button} from 'react-native-elements';
import { NavigationEvents} from 'react-navigation';
import {useDispatch} from 'react-redux';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import {clearErrorMessage} from '../store/actions/errors';

const SignupScreen = ({navigation})=>{
	const dispatch = useDispatch();
	return (
		<SafeAreaView style={styles.container}>
			<NavigationEvents onWillFocus={()=>dispatch(clearErrorMessage())} />
			<AuthForm btnText="Sign Up" type="signup"/>
			<NavLink text='Sign in instead' navigation={navigation} route='Signin'/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent:'center'

	}
})


export default SignupScreen;