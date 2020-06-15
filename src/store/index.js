import rootReducer from './reducers';
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';


const configureStore=()=>{
	const store = createStore(
		rootReducer,
		compose(
	      applyMiddleware(thunk)
    	)
	);

	return store
}


export default configureStore;