import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList,SafeAreaView, Dimensions} from 'react-native';
import {Text, Button, ListItem} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import PercentCard from '../components/PercentCard'; 
import {FontAwesome} from '@expo/vector-icons';
import GameResults from '../components/GameResults';
import {submitGame} from '../store/actions/game';
import Loading from '../components/Loading';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const EndgameScreen = ({navigation})=>{
	const dispatch = useDispatch();
	const [loading,setLoading] = useState(false);
	const game = useSelector((state)=>state.game);
	const {stats, minutes, player, name} = game;
	useEffect(()=>{
		navigation.setParams({title:name});
	}, [])
	if(loading){
		return <Loading/>;
	}else{
		return (
			<SafeAreaView style={styles.container}>
				<GameResults stats={stats} minutes={minutes} player={player}/>
				<Button 
					title="Submit Final Results" 
					buttonStyle={{height:height*0.06,borderRadius:50, backgroundColor:'#02a1e6'}}
					containerStyle={{marginHorizontal:5, marginBottom:10, marginTop:3}}
					raised
					onPress={()=>{
						setLoading(true);
						dispatch(submitGame(game));
					}}
				/>

			</SafeAreaView>
		)
	}
	
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		margin:0,
		padding:0,
		backgroundColor:'#f9f9f9'
	},
	liContainer:{
		shadowColor: 'rgba(0,0,0, .4)', // IOS
	    shadowOffset: { height: 1, width: 1 }, // IOS
	    shadowOpacity: 1, // IOS
	    shadowRadius: 1, //IOS
	    backgroundColor: '#fff',
	    elevation: 2, // Android
	    paddingVertical:5, 
	    paddingHorizontal:10, 
	    borderRadius:25, 
	    marginVertical:3, 
	    marginHorizontal:10
	},
	nameContainer:{
		paddingVertical:10, 
		paddingHorizontal:20, 
		borderRadius:25, 
		marginBottom:5, 
		marginTop:10, 
		marginHorizontal:8,
		shadowColor: 'rgba(0,0,0, .4)', // IOS
	    shadowOffset: { height: 1, width: 1 }, // IOS
	    shadowOpacity: 1, // IOS
	    shadowRadius: 1, //IOS
	    backgroundColor: '#fff',
	    elevation: 2, // Android
	},
	timeContainer:{
		paddingVertical:5, 
		paddingHorizontal:10, 
		borderRadius:25, 
		marginVertical:3, 
		marginHorizontal:8,
		shadowColor: 'rgba(0,0,0, .4)', // IOS
	    shadowOffset: { height: 1, width: 1 }, // IOS
	    shadowOpacity: 1, // IOS
	    shadowRadius: 1, //IOS
	    backgroundColor: '#fff',
	    elevation: 2, // Android
	}
	
})


export default EndgameScreen;