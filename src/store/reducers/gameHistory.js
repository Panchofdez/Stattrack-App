const initialState=[]

const gameHistory = (state=initialState, action)=>{
	switch(action.type){
		case 'GET_GAMES':
			return [...action.games];
		default:
			return state;
	}
}


export default gameHistory;