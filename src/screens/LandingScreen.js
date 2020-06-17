import React from 'react';
import {SafeAreaView, View, StyleSheet, ImageBackground} from 'react-native';
import {Text,Button} from 'react-native-elements';
import backgroundImg from '../../assets/fieldBG.jpg';
import Spacer from '../components/Spacer';


const LandingScreen = ({navigation})=>{
	return(
		<SafeAreaView style={styles.container}>
			<ImageBackground source={backgroundImg} style={styles.background}>
				<View style={styles.contentContainer}>
					<Spacer>
						<View style={{flexDirection:'row', alignSelf:'center'}}>
							<Text style={styles.title1} h1>Stat</Text><Text style={styles.title2} h1>Track</Text>
						</View>
					</Spacer>
					<Spacer>
						<Button title='Get Started' onPress={()=>navigation.navigate('Signup')} buttonStyle={styles.button}/>
					</Spacer>
					<Spacer>
						<Button title='Sign In' onPress={()=>navigation.navigate('Signin')} buttonStyle={styles.button}/>
					</Spacer>
				</View>
			</ImageBackground>
		</SafeAreaView>
	)
}



const styles= StyleSheet.create({
	container:{
		flex:1,
		margin:0,
		padding:0,
	},
	background:{
		flex: 1,
    	resizeMode: "cover",
    	justifyContent: "center"
	},
	button:{
		backgroundColor:'#02a1e6',
		borderRadius:25,
		height:50
	},
	contentContainer:{
		flex:1,
		flexDirection:'column',
		justifyContent:'center'
	},
	title1:{
		color:'white',
	},
	title2:{
		color:'#02a1e6',
	}
})



export default LandingScreen;