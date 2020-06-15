import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Provider} from 'react-redux';
import configureStore from './src/store';
import HomeScreen from './src/screens/HomeScreen';
import SignupScreen from './src/screens/SignupScreen';
import SigninScreen from './src/screens/SigninScreen';
import GameScreen from './src/screens/GameScreen';
import EndgameScreen from './src/screens/EndgameScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PlayerProfilesScreen from './src/screens/PlayerProfilesScreen';
import CreatePlayerProfileScreen from './src/screens/CreatePlayerProfileScreen';
import CreateGameScreen from './src/screens/CreateGameScreen';
import AuthenticateScreen from './src/screens/AuthenticateScreen';
import GameHistoryScreen from './src/screens/GameHistoryScreen';
import GameShowScreen from './src/screens/GameShowScreen';
import Header from './src/components/Header';
import CustomDrawer from './src/components/CustomDrawer';
import {setNavigator} from './src/navigationRef';
import {MaterialCommunityIcons, FontAwesome} from '@expo/vector-icons';

const store = configureStore();



const switchNavigator =  createSwitchNavigator({
  Auth:AuthenticateScreen,
  loginFlow:createStackNavigator({
    Signup:{screen:SignupScreen,navigationOptions:{headerShown:false}},
    Signin:{screen:SigninScreen, navigationOptions:{headerShown:false}}
  }),
  mainFlow:createDrawerNavigator({
    gameFlow:createStackNavigator({
      CreateGame:{screen:CreateGameScreen, navigationOptions:({navigation})=>{
        return {headerTitle:()=><Header navigation={navigation} title='SuperSoccerDad  '/>}
      }},
      Game:{screen:GameScreen, navigationOptions :({ navigation }) => {
        return {
          title: navigation.getParam('title', 'Game'),
        };
      }},
      Endgame:{screen:EndgameScreen, navigationOptions:({ navigation }) => {
        return {
          title: navigation.getParam('title', 'Game Results')
        }
      }},
      CreatePlayerProfile:{screen:CreatePlayerProfileScreen, navigationOptions:{title:''}}
    },{
        defaultNavigationOptions:{
            headerTintColor: '#02a1e6',
            headerStyle: {
              backgroundColor: '#fff',
              height:100
            }
        },
        navigationOptions:{
            title:'Home ',
            drawerIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name='home' size={25} color={tintColor}/>
            ),
        } 
    }),   
    profileFlow:createStackNavigator({
      PlayerProfiles:{screen:PlayerProfilesScreen, navigationOptions:({navigation})=>{
        return {headerTitle:()=><Header navigation={navigation} title='Player Profiles '/>}
      }}, 
      Profile:{screen:ProfileScreen, navigationOptions:{title:''}},
      CreateProfile:{screen:CreatePlayerProfileScreen, navigationOptions:{title:''}}
    },{
        defaultNavigationOptions:{
            headerTintColor: '#02a1e6',
            headerStyle: {
              backgroundColor: '#fff',
              height:100
            }
        },
        navigationOptions:{
            title:'Player Profiles ',
            drawerIcon: ({ tintColor }) => (
                <FontAwesome name='user' size={23} color={tintColor}/>
            ),
        } 
    }),   
    gameHistoryFlow:createStackNavigator({
      GameHistory:{screen:GameHistoryScreen, navigationOptions:({navigation})=>{
        return {headerTitle:()=><Header navigation={navigation} title='Games '/>}
      }}, 
      GameShow:{screen:GameShowScreen, navigationOptions:{title:''}}
    }, {
        defaultNavigationOptions:{
            headerTintColor: '#02a1e6',
            headerStyle: {
              backgroundColor: '#fff',
              height:100
            }
        },
        navigationOptions:{
            title:'Games ',
            drawerIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name='whistle' size={25} color={tintColor}/>
            ),
        } 
    }),   
  }, {
    contentComponent:CustomDrawer,
    contentOptions:{
      activeTintColor:'#02a1e6'
    }
  })
})


const App =  createAppContainer(switchNavigator);


export default ()=>{
  return(
    <Provider store={store}>
      <App ref={(navigator)=>setNavigator(navigator)}/>
    </Provider>
  )
}
