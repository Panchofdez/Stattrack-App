import React from 'react';
import {StyleSheet, View, FlatList,SafeAreaView, Dimensions} from 'react-native';
import {Text, Button, ListItem} from 'react-native-elements';
import PercentCard from '../components/PercentCard'; 
import {FontAwesome} from '@expo/vector-icons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const defence = '#f2c924'
const offence ='#19e02d' 
const badOffence = '#e84233'

const items =[
	{title:'Goals', color:offence},
	{title:'Assists',color:offence},
	{title:'Chances Created',color:offence},
	{title:'Crosses',color:offence},
	{title:'Fouls Drawn',color:offence},
	{title:'Shots On Goal',color:offence},
	{title:'Passes Completed',color:offence},
	{title:'Successful Dribbles',color:offence},
	{title:'Shots Missed',color:badOffence},
	{title:'Passes Incomplete',color:badOffence},
	{title:'Unsuccessful Dribbles',color:badOffence},
	{title:'Successful Tackles',color:defence},
	{title:'Clearances',color:defence},
	{title:'Blocked Shots',color:defence},
	{title:'Interceptions',color:defence},
];

const gkItems=[
	{title:'Saves', color:offence},
	{title:'Penalties Saved', color:offence},
	{title:'Claims Punches', color:offence},
	{title:'Sweeper Clearances', color:offence},
	{title:'Accurate Passes', color:defence},
	{title:'Accurate Volleys', color:defence},
	{title:'Accurate Throws', color:defence},	
	{title:'Penalty Goals Allowed', color:badOffence},
	{title:'Goals Allowed', color:badOffence},
	{title:'Inaccurate Passes', color:badOffence},
	{title:'Inaccurate Volleys', color:badOffence},
	{title:'Inaccurate Throws', color:badOffence},
]


const GameResults = ({minutes,stats,player})=>{
	const findAccuracy = (stat1, stat2)=>{
		return Math.round((stat1 / (stat1 + stat2))* 100);
	}
	if(player.position === 'Goalkeeper'){
		const savePercentage = findAccuracy(stats['Saves'], stats['GoalsAllowed']);
		const accurateDist = stats['AccuratePasses'] + stats['AccurateVolleys'] + stats['AccurateThrows'];
		const inaccurateDist = stats['InaccuratePasses'] + stats['InaccurateVolleys'] + stats['InaccurateThrows'] 
		const distributionAccuracy = findAccuracy(accurateDist, inaccurateDist);
		const penaltySavePercentage = findAccuracy(stats['PenaltiesSaved'] , stats['PenaltyGoalsAllowed'])
		return(
			<FlatList
				data={gkItems}
				keyExtractor={(b)=>b.title}
				ListHeaderComponent={
					<View>
						<ListItem
							title={player.name}
							subtitle= {player.position}
							leftIcon={<FontAwesome name='user-circle' size={35}/>}
							titleStyle={{fontSize:20, fontWeight: 'bold' }}
							subTitleStyle={{fontSize:18}}
							containerStyle={styles.nameContainer}
						
						/>
						<ListItem
							title='Minutes Played'
							rightIcon={
								<View style={{borderColor:'#02a1e6',borderRadius:100, borderWidth:1, padding:10, height:60, width:60 , justifyContent:'center'}}>
									<Text h4  style={{alignSelf:'center'}} h4Style={{fontSize:18, color:'#02a1e6', fontWeight:'bold'}}>{minutes}</Text>
								</View>
							}
							containerStyle={styles.timeContainer}
						/>
						<View style={{flexDirection:'row', justifyContent:'space-around', marginHorizontal:5}}>
							<PercentCard percent={savePercentage} title='Save Percentage'/>
							<PercentCard percent={distributionAccuracy} title='Distribution Accuracy'/>						
							<PercentCard percent={penaltySavePercentage} title='Penalty Save Percentage'/>
						</View>
					</View>
				}
				renderItem={({item})=>{
					return(
						<ListItem
							title={item.title}
							containerStyle={styles.liContainer}
							bottomDivider
							rightIcon={
								<View style={{backgroundColor:item.color,borderRadius:100, padding:10, height:50, width:50, justifyContent:'center'}}>
									<Text h4  style={{alignSelf:'center'}} h4Style={{fontSize:14, color:'#fff'}}>{stats[item.title.split(" ").join("")]}</Text>
								</View>
							}
						/>


					)

				}}
			/>
		)
	}else{
		const passAccuracy = findAccuracy(stats['PassesCompleted'], stats['PassesIncomplete']);
		const shotAccuracy = findAccuracy(stats['ShotsOnGoal'], stats['ShotsMissed']);
		const dribbleSuccess = findAccuracy(stats['SuccessfulDribbles'], stats['UnsuccessfulDribbles']);
		return(
			<FlatList
				data={items}
				keyExtractor={(b)=>b.title}
				ListHeaderComponent={
					<View>
						<ListItem
							title={player.name}
							subtitle= {player.position}
							leftIcon={<FontAwesome name='user-circle' size={35}/>}
							titleStyle={{fontSize:20, fontWeight: 'bold' }}
							subTitleStyle={{fontSize:18}}
							containerStyle={styles.nameContainer}
						
						/>
						<ListItem
							title='Minutes Played'
							rightIcon={
								<View style={{borderColor:'#02a1e6',borderRadius:100, borderWidth:1, padding:10, height:60, width:60 , justifyContent:'center'}}>
									<Text h4  style={{alignSelf:'center'}} h4Style={{fontSize:18, color:'#02a1e6', fontWeight:'bold'}}>{minutes}</Text>
								</View>
							}
							containerStyle={styles.timeContainer}
						/>
						<View style={{flexDirection:'row', justifyContent:'space-around', marginHorizontal:5}}>
							<PercentCard percent={shotAccuracy} title='Shot Accuracy'/>
							<PercentCard percent={passAccuracy} title='Pass Accuracy'/>						
							<PercentCard percent={dribbleSuccess} title='Dribble Success Rate'/>
						</View>
					</View>
				}
				renderItem={({item})=>{
					return(
						<ListItem
							title={item.title}
							containerStyle={styles.liContainer}
							bottomDivider
							rightIcon={
								<View style={{backgroundColor:item.color,borderRadius:100, padding:10, height:50, width:50, justifyContent:'center'}}>
									<Text h4  style={{alignSelf:'center'}} h4Style={{fontSize:14, color:'#fff'}}>{stats[item.title.split(" ").join("")]}</Text>
								</View>
							}
						/>


					)

				}}
			/>
		)
	}
}


const styles = StyleSheet.create({
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
	    elevation: 3, // Android
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
	    elevation: 3, // Android
	}
})


export default GameResults;

