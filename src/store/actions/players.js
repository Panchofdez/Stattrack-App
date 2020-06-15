import apiCall from '../../api/apiCall';
import {navigate} from '../../navigationRef';
import {addErrorMessage} from './errors';


export const fetchPlayerProfiles = (playerProfiles)=>{
	return {
		type:'FETCH_PLAYER_PROFILES',
		playerProfiles
	}
}

export const addPlayerProfile = (playerProfile)=>{
	return {
		type:'ADD_PLAYER_PROFILE',
		playerProfile
	}
}


export const getPlayerProfiles = ()=>{
	return async dispatch =>{
		try{
			const response = await apiCall.get('/playerprofiles');
			dispatch(fetchPlayerProfiles(response.data));
			return response.data;
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error));
		}
		
	}
}

export const createPlayerProfile = (formData)=>{
	return async dispatch =>{
		try{
			const response = await apiCall.post('/playerprofiles/create', formData);
			const {profile} = response.data;
			dispatch(addPlayerProfile(profile));
			return;
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error));
			throw Error(err);
		}
	}
}