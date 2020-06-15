import apiCall from '../../api/apiCall';
import {navigate} from '../../navigationRef';
import {addErrorMessage} from './errors';
import {fetchPlayerProfiles} from './players';

export const createGame = (player, name)=>{
	return {
		type:'CREATE_GAME',
		player,
		name
	}
}


export const endGame = (stats, minutes)=>{
	return {
		type:'END_GAME',
		stats,
		minutes
	}
}

export const getGames =(games)=>{
	return {
		type:'GET_GAMES',
		games
	}
}

export const clearGame =()=>{
	return {
		type:'CLEAR_GAME'
	}
}


export const trackGame = (player, name)=>{
	return dispatch =>{
		dispatch(createGame(player, name));
	}
}

export const finishGame = (stats, minutes)=>{
	return dispatch =>{
		dispatch(endGame(stats, minutes));
	}
}

export const fetchGames = ()=>{
	return async dispatch =>{
		try{
			console.log('arrived');
			const response = await apiCall.get('/games');
			console.log(response.data);
			dispatch(getGames(response.data));
		}catch(err){
			dispatch(addErrorMessage(err.response.data));
		}
		
	}
}

export const submitGame = (gameData)=>{
	return async dispatch=>{
		try{
			const response = await apiCall.post('/createGame', gameData);
			const {games, profiles} = response.data;
			dispatch(getGames(games));
			dispatch(fetchPlayerProfiles(profiles));
			dispatch(clearGame());
			navigate('CreateGame');
		}catch(err){
			dispatch(addErrorMessage(err.response.data.error))
		}
	}
}