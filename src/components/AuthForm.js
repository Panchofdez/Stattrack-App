import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import {Text, Button, Input} from 'react-native-elements';
import Spacer from './Spacer';
import {signin} from '../store/actions/auth';



const AuthForm = ({btnText, type})=>{
	const error = useSelector((state)=>state.errors.error);
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword]= useState("");
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
		marginTop:50
	}
}); 


export default AuthForm;