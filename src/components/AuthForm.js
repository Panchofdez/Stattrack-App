import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import {Text, Button, Input} from 'react-native-elements';
import Spacer from './Spacer';
import * as Facebook from 'expo-facebook';
import {signin, fbLogin} from '../store/actions/auth';
import {FontAwesome} from '@expo/vector-icons';


const AuthForm = ({btnText, type})=>{
	const error = useSelector((state)=>state.errors.error);
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword]= useState("");
	const facebookLogin = async() => {
		await Facebook.initializeAsync('593232511571616');
		const {type,token}= await Facebook.logInWithReadPermissionsAsync({permissions:['public_profile']});
		if(type==='success'){
			console.log('success')
			console.log(token);
			dispatch(fbLogin(token));
		}else{
			console.log('cancelled');
			return;
		}
	}
	return (
		<View style={styles.container}>
			<Spacer>
				<Input
					label="Email"
			        value={email}
			        onChangeText={setEmail}
			        autoCapitalize="none"
			        autoCorrect={false}
				/>
			</Spacer>
			<Spacer>
				<Input
					secureTextEntry
			        label="Password"
			        value={password}
			        onChangeText={setPassword}
			        autoCapitalize="none"
			        autoCorrect={false}
				/>
			</Spacer>
			{error ? (
				<React.Fragment>
		        	<Text style={styles.errorMessage}>{error}</Text>
		        	<Spacer/>
		        </React.Fragment>
		    	) : null}
		    
			<Spacer>
				<Button title={btnText} onPress={()=>dispatch(signin(type, {email,password }))} buttonStyle={styles.button}/>
			</Spacer>
			<Spacer>
				<Button 
					title={`${btnText} with Facebook`} 
					onPress={()=>facebookLogin()} 
					buttonStyle={styles.facebookBtn}
					icon={
						<FontAwesome name='facebook-square' size={30} color='white' style={{marginRight:10}}/>
					}
				/>
			</Spacer>
		</View>
	)
}



const styles= StyleSheet.create({
	button:{
		backgroundColor:'#02a1e6',
		borderRadius:25,
		height:50
	},
	errorMessage:{
	    fontSize: 16,
	    color: 'red',
	    marginLeft: 25,
	},
	container:{
		marginTop:110
	},
	facebookBtn:{
		backgroundColor:'#3b5998',
		borderRadius:25,
		height:50
	}
}); 


export default AuthForm;