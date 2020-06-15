const initialState={
	player:{},
	name:'',
	stats:{},
	minutes:null
}

const game = (state=initialState, action)=>{
	switch(action.type){
		case 'CREATE_GAME':
			return {...state, player:{...action.player}, name:action.name};
		case 'END_GAME':
			return {...state, stats:{...action.stats}, minutes:action.minutes};
		case 'CLEAR_GAME':
			return initialState;
		default:
			return state;
	}
}

export default game;