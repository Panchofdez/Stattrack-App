export const addError= (error)=>{
	return {
		type:'ADD_ERROR',
		error
	}
}

export const clearError=()=>{
	return {
		type:"CLEAR_ERROR"
	}
}



export const addErrorMessage = (error)=>{
	return dispatch =>{
		dispatch(addError(error));
	}
}


export const clearErrorMessage = ()=>{
	return dispatch=>{
		dispatch(clearError());
	}
}