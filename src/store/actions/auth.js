import {AsyncStorage} from 'react-native';
import apiCall from '../../api/apiCall';
import {navigate} from '../../navigationRef';
import {addErrorMessage, clearErrorMessage} from './errors';
import jwtDecode from 'jwt-decode';


export const setToken = (token) => {
	return {
		type:"SET_USER_TOKEN",
		token
	}	
}

export const logout = ()=>{
	return {
		type:"LOGOUT"
	}
}


export const authUser = ()=>{
	return async dispatch=>{
		try{
			const token = await AsyncStorage.getItem('token');
			if(token){
				const decodedToken = jwtDecode(token);
				console.log(decodedToken);
	 			if (decodedToken.exp * 1000 < Date.now()) {
	 				console.log('expired');
	 				let uid;
	 				if(decodedToken.user_id){
	 					uid = decodedToken.user_id;
	 				}else{
	 					uid = decodedToken.uid;
	 				}
					await AsyncStorage.removeItem('token');
	 				const response = await apiCall.post('/getToken', {uid}) 
	  				const {token} = response.data;
	  				console.log(token);
	  				await AsyncStorage.setItem('token', token);
	  				dispatch(setToken(token));
					dispatch(clearErrorMessage());
					navigate('CreateGame'); 
				}else{
					console.log('not expired')
	  				dispatch(setToken(token));
					dispatch(clearErrorMessage());
					navigate('CreateGame'); 
				}
			}else{
				console.log('no token');
				navigate('loginFlow');
			}
		}catch(err){
			console.log('Error')
			console.log(err.response.data.error);
			dispatch(logout());
			navigate('loginFlow');
		}
		
	}
}


export const signin =(type, formData)=>{
	return async dispatch =>{
		try{
			const response = await apiCall.post(`/${type}`, formData );
			const {token} = response.data;
			await AsyncStorage.setItem('token', token);
			dispatch(setToken(token));
			dispatch(clearErrorMessage());
			navigate('gameFlow');
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error));
		}
	}
}



export const signout =()=>{
	return async dispatch=>{
		try{
			await AsyncStorage.removeItem('token');
  			dispatch(logout());
  			navigate('loginFlow');
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error));
		}
	}
}


