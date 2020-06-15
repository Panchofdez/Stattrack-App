import React, {useState, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, Dimensions, FlatList, TouchableOpacity,Alert} from 'react-native';
import {Text, Button, CheckBox, SearchBar} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import { NavigationEvents} from 'react-navigation';
import {trackGame} from '../store/actions/game';
import {getPlayerProfiles} from '../store/actions/players';
import Loading from '../components/Loading';
import {MaterialCommunityIcons} from '@expo/vector-icons';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const CreateGameScreen = ({navigation})=>{
	const dispatch = useDispatch();
	const players = useSelector((state)=>state.players);
	const createPlayerObj = (profiles)=>{
		const playerObj = {}
		if (profiles && profiles.length > 0){
			for(let x of profiles){
				playerObj[x.name]=false
			}
		}
		return playerObj
	}
	const fetch = async ()=>{
		const response = await dispatch(getPlayerProfiles())
		setPlayerProfiles(createPlayerObj(response));
		setLoading(false);
	}
	const [playerProfiles, setPlayerProfiles] = useState();
	const [checked, setChecked] = useState(null);
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(true);
	useEffect(()=>{
		fetch();
	}, []);
	
	const [visible, setVisible] = useState(false);

	const toggleOverlay = () => {
		setVisible(!visible);
	};
	if (loading){
		return <Loading/>;
	}
	else{
		return (
			<SafeAreaView style={styles.container}>
				<NavigationEvents 
					onWillFocus={()=>{
						if(players){
							setChecked(null);
							setPlayerProfiles(createPlayerObj(players))
						}
						
					}}
				/>
				<FlatList
					data={players}
					keyExtractor={(p)=>p.name}
					ListHeaderComponent={
						<View>
							<Text style={styles.label}>Name</Text>
							<View style={styles.nameContainer}>
								<SearchBar
							    	placeholder="Who's playing?"
							        onChangeText={setName}
							        lightTheme
							        autoCorrect={false}
							        containerStyle={styles.searchContainer}
							        inputContainerStyle={styles.inputContainer}
							        searchIcon={<MaterialCommunityIcons name='pencil' size={20} color='#949494' />}
							        clearIcon={false}
							        value={name}
							    />
							</View>
							<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:5}}>
								<Text style={styles.label}>Select Player</Text>
								<TouchableOpacity onPress={()=>navigation.navigate('CreatePlayerProfile')}>
									<Text style={styles.link}>Create Player Profile</Text>
								</TouchableOpacity>
							</View>
							{players.length===0 && (
								<CheckBox
									title={'No player profiles'}
									textStyle={{fontSize:16}}
									checkedColor='#02a1e6'
									containerStyle={styles.checkbox}
								/>

							)}
							
						</View>
				
					}
				
					renderItem={({item})=>{
						return(
							<CheckBox
								title={item.name}
								checked={playerProfiles[item.name]}
								textStyle={{fontSize:16}}
								checkedColor='#02a1e6'
								containerStyle={styles.checkbox}
								onPress={()=>{
									let newState;
							  		setPlayerProfiles(prevState=>{
							  			newState = {...prevState}
							  			Object.keys(newState).forEach((k) => {
							  				if (newState[k] ==true){
							  					newState[k]= !newState[k]	
							  				} else if (k==item.name){
							  					newState[k]=true
							  				}
							  			})
							  			return newState
							  		})
							  		if (newState[item.name]===true){
							  			setChecked(item);
							  		}else{
							  			setChecked(null);
							  		}
							  		
							  	}}
							/>
						)
					}}
				/>
				<Button 
					title="Track Game" 
					buttonStyle={{height:height*0.06,borderRadius:50, backgroundColor:'#02a1e6'}}
					containerStyle={{marginHorizontal:3, marginBottom:20}}
					raised
					onPress={()=>{
						if(!checked || !name){
							Alert.alert('You must provide a name and select a player')
							return;
						}else{
							dispatch(trackGame(checked, name));
							setName('');
							navigation.navigate('Game');
						}
						
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
	label:{
		fontSize:20, 
		fontWeight:'bold', 
		marginLeft:20, 
		marginTop:20, 
		marginBottom:10
	},
	link:{
		fontSize:16, 
		fontWeight:'bold', 
		marginRight:20, 
		marginTop:20, 
		marginBottom:10,
		color:'#02a1e6'
	},
	checkbox:{
		paddingVertical:20, 
		paddingHorizontal:20, 
		borderRadius:25, 
		marginVertical:5,
		marginHorizontal:8, 
		backgroundColor:'#fff',
		shadowColor: 'rgba(0,0,0, .4)', // IOS
	    shadowOffset: { height: 1, width: 1 }, // IOS
	    shadowOpacity: 1, // IOS
	    shadowRadius: 1, //IOS
	    backgroundColor: '#fff',
	    elevation: 2, // Android
	},
	inputContainer:{
		borderRadius:25, 
		backgroundColor:'#fff'
	},
	searchContainer:{
		borderRadius:50, 
		marginHorizontal:8, 
		marginTop:5,
		marginBottom:2,
		paddingVertical:2,
		backgroundColor:'transparent',
		borderBottomColor: 'transparent',
 		borderTopColor: 'transparent',
 		shadowColor: 'rgba(0,0,0, .4)', // IOS
	    shadowOffset: { height: 1, width: 1 }, // IOS
	    shadowOpacity: 1, // IOS
	    shadowRadius: 1, //IOS
	    backgroundColor: '#fff',
	    elevation: 2, // Android
	},
})


export default CreateGameScreen;