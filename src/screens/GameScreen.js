import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { finishGame } from "../store/actions/game";
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import {
  Text,
  Button,
  ListItem,
  Card,
  Overlay,
  SearchBar,
} from "react-native-elements";
import {
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const defence = "#f2c924";
const offence = "#19e02d";
const badOffence = "#e84233";

const buttons = [
  { title: "Goals", color: offence },
  { title: "Assists", color: offence },
  { title: "Chances Created", color: offence },
  { title: "Crosses", color: offence },
  { title: "Fouls Drawn", color: offence },
  { title: "Blocked Shots", color: defence },
  { title: "Shots On Goal", color: offence },
  { title: "Shots Missed", color: badOffence },
  { title: "Successful Tackles", color: defence },
  { title: "Passes Completed", color: offence },
  { title: "Passes Incomplete", color: badOffence },
  { title: "Clearances", color: defence },
  { title: "Successful Dribbles", color: offence },
  { title: "Unsuccessful Dribbles", color: badOffence },
  { title: "Interceptions", color: defence },
];

const gkButtons = [
  { title: "Saves", color: offence },
  { title: "Penalties Saved", color: offence },
  { title: "Claims Punches", color: offence },
  { title: "Goals Allowed", color: badOffence },
  { title: "Penalty Goals Allowed", color: badOffence },
  { title: "Sweeper Clearances", color: offence },
  { title: "Accurate Passes", color: defence },
  { title: "Accurate Volleys", color: defence },
  { title: "Accurate Throws", color: defence },
  { title: "Inaccurate Passes", color: badOffence },
  { title: "Inaccurate Volleys", color: badOffence },
  { title: "Inaccurate Throws", color: badOffence },
];

const playerState = {
  Goals: 0,
  Assists: 0,
  ChancesCreated: 0,
  Crosses: 0,
  PassesCompleted: 0,
  ShotsOnGoal: 0,
  SuccessfulDribbles: 0,
  FoulsDrawn: 0,
  Interceptions: 0,
  Clearances: 0,
  SuccessfulTackles: 0,
  BlockedShots: 0,
  ShotsMissed: 0,
  PassesIncomplete: 0,
  UnsuccessfulDribbles: 0,
};
const gkState = {
  Saves: 0,
  PenaltiesSaved: 0,
  ClaimsPunches: 0,
  GoalsAllowed: 0,
  PenaltyGoalsAllowed: 0,
  SweeperClearances: 0,
  AccuratePasses: 0,
  AccurateVolleys: 0,
  AccurateThrows: 0,
  InaccuratePasses: 0,
  InaccurateVolleys: 0,
  InaccurateThrows: 0,
};
const GameScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const player = useSelector((state) => state.game.player);
  const name = useSelector((state) => state.game.name);
  const [gameState, setGameState] = useState(
    player.position === "Goalkeeper" ? gkState : playerState
  );
  const [minutes, setMinutes] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setMinutes(0);
    setIsActive(false);
  };
  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState("");
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    let interval = null;
    navigation.setParams({ title: name });
    navigation.setParams({ toggleHelp });
    if (isActive) {
      interval = setInterval(() => {
        setMinutes((minutes) => minutes + 1);
      }, 60000);
    } else if (!isActive && minutes !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes]);

  const setUp = () => {
    if (player.position == "Goalkeeper") {
      return gkButtons;
    } else {
      return buttons;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={setUp()}
        keyExtractor={(b) => b.title}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        ListHeaderComponent={
          <View>
            <ListItem
              title={player.name}
              subtitle={player.position}
              leftIcon={<FontAwesome name="user-circle" size={35} />}
              titleStyle={{ fontSize: 20, fontWeight: "bold" }}
              subTitleStyle={{ fontSize: 18 }}
              containerStyle={styles.liContainer}
            />
            <ListItem
              rightIcon={
                <View style={{ flexDirection: "row" }}>
                  <Button
                    title={!isActive ? "Start" : "Pause"}
                    icon={<MaterialIcons name="timer" size={28} color="#fff" />}
                    titleStyle={{ fontSize: 14, marginHorizontal: 5 }}
                    buttonStyle={{
                      borderRadius: 50,
                      backgroundColor: "#02a1e6",
                      marginHorizontal: 2,
                      padding: 10,
                    }}
                    onPress={() => toggle()}
                  />
                  <Button
                    title="Reset"
                    icon={<FontAwesome5 name="undo" size={18} color="#fff" />}
                    titleStyle={{ fontSize: 14, marginLeft: 5 }}
                    buttonStyle={{
                      borderRadius: 50,
                      backgroundColor: "#02a1e6",
                      padding: 14,
                    }}
                    onPress={() => reset()}
                  />
                </View>
              }
              leftIcon={
                <View
                  style={{
                    borderColor: "#02a1e6",
                    borderRadius: 100,
                    borderWidth: 1,
                    padding: 10,
                    height: 60,
                    width: 60,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    h4
                    style={{ alignSelf: "center" }}
                    h4Style={{
                      fontSize: 18,
                      color: "#02a1e6",
                      fontWeight: "bold",
                    }}
                  >
                    {minutes}
                  </Text>
                </View>
              }
              title="Minutes Played"
              titleStyle={{ fontSize: 16, fontWeight: "bold" }}
              containerStyle={styles.timeContainer}
            />
          </View>
        }
        renderItem={({ item }) => {
          const name = item.title.split(" ").join("");
          return (
            <View style={styles.btnContainer}>
              <Text
                style={{ alignSelf: "center", color: item.color }}
                h4Style={{ fontSize: 28 }}
                h4
              >
                {gameState[name]}
              </Text>
              <Button
                title={item.title}
                titleStyle={{ fontSize: 14 }}
                buttonStyle={{
                  height: height * 0.06,
                  backgroundColor: item.color,
                  borderRadius: 50,
                }}
                containerStyle={{ marginHorizontal: 3 }}
                raised
                onPress={() =>
                  setGameState((prevState) => {
                    return { ...prevState, [name]: prevState[name] + 1 };
                  })
                }
                onLongPress={() =>
                  setGameState((prevState) => {
                    if (prevState[name] === 0) {
                      return prevState;
                    } else {
                      return { ...prevState, [name]: prevState[name] - 1 };
                    }
                  })
                }
              />
            </View>
          );
        }}
      />
      <Overlay
        isVisible={showHelp}
        onBackdropPress={toggleHelp}
        overlayStyle={styles.overlay}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 10,
              marginTop: 5,
              marginLeft: 5,
            }}
          >
            <MaterialCommunityIcons
              name="help-circle"
              size={35}
              color="#02a1e6"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.title}>Help</Text>
          </View>
          <Text style={styles.text}>1. Tap to increase the stat</Text>
          <Text style={styles.text}>
            2. Press and hold to decrease the stat
          </Text>
          <Text style={styles.text}>
            3. When you are done tracking the game press Game Over
          </Text>
          <Text style={styles.text}>
            4. If you didn't use our timer to track the minutes played you will
            be prompted to input the number of minutes
          </Text>
        </View>
      </Overlay>
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlay}
      >
        <View>
          <Text style={styles.label}>Minutes Played</Text>
          <SearchBar
            placeholder="Number of minutes"
            onChangeText={setInput}
            lightTheme
            autoCorrect={false}
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.inputContainer}
            searchIcon={
              <MaterialCommunityIcons name="pencil" size={20} color="#949494" />
            }
            clearIcon={false}
            value={input}
          />
          <Button
            title="Submit"
            raised
            containerStyle={{ marginHorizontal: 7, marginVertical: 10 }}
            buttonStyle={{
              borderRadius: 50,
              backgroundColor: "#02a1e6",
              height: 55,
            }}
            onPress={() => {
              if (isNaN(input) || input == "") {
                return;
              } else {
                dispatch(finishGame(gameState, Number(input)));
                navigation.navigate("Endgame");
                setVisible(false);
                setInput("");
                setMinutes(0);
                setIsActive(false);
              }
            }}
          />
        </View>
      </Overlay>
      <Button
        title="Game Over"
        buttonStyle={{
          height: height * 0.06,
          borderRadius: 50,
          backgroundColor: "#02a1e6",
        }}
        containerStyle={{ marginHorizontal: 3, marginBottom: 10 }}
        raised
        onPress={() => {
          if (minutes === 0) {
            setVisible(true);
            return;
          } else {
            setMinutes(0);
            setIsActive(false);
            dispatch(finishGame(gameState, minutes));
            navigation.navigate("Endgame");
          }
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
    backgroundColor: "#f9f9f9",
  },
  btnContainer: {
    width: width * 0.32,
    marginVertical: 3,
    marginHorizontal: 2.5,
    borderRadius: 25,
    backgroundColor: "#fff",
    padding: 8,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: "#fff",
    elevation: 3, // Android
  },
  liContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 3,
    marginTop: 10,
    marginHorizontal: 3,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: "#fff",
    elevation: 3, // Android
  },
  timeContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    marginVertical: 5,
    marginHorizontal: 3,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: "#fff",
    elevation: 3, // Android
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  inputContainer: {
    borderRadius: 25,
    backgroundColor: "#fff",
  },
  searchContainer: {
    borderRadius: 50,
    marginHorizontal: 8,
    marginTop: 10,
    marginBottom: 5,
    paddingVertical: 2,
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: "#fff",
    elevation: 2, // Android
  },
  overlay: {
    borderRadius: 25,
    width: width * 0.9,
    padding: 20,
  },
  text: {
    fontSize: 20,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 25,
    color: "#02a1e6",
  },
});

export default GameScreen;
