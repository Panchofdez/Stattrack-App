import React from "react";
import { StyleSheet, View, SafeAreaView, FlatList } from "react-native";
import { Text, Button, ListItem } from "react-native-elements";
import PercentCard from "../components/PercentCard";
import { FontAwesome } from "@expo/vector-icons";

const defence = "#f2c924";
const offence = "#19e02d";
const badOffence = "#e84233";
const items = [
  { title: "Goals", key: "goals", color: offence },
  { title: "Assists", key: "assists", color: offence },
  { title: "Chances Created", key: "chancesCreated", color: offence },
  { title: "Crosses", key: "crosses", color: offence },
  { title: "Fouls Drawn", key: "foulsDrawn", color: offence },
  { title: "Shots On Goal", key: "shotsOnGoal", color: offence },
  { title: "Passes Completed", key: "passesCompleted", color: offence },
  { title: "Successful Dribbles", key: "successfulDribbles", color: offence },
  { title: "Shots Missed", key: "shotsMissed", color: badOffence },
  { title: "Passes Incomplete", key: "passesIncomplete", color: badOffence },
  {
    title: "Unsuccessful Dribbles",
    key: "unsuccessfulDribbles",
    color: badOffence,
  },
  { title: "Interceptions", key: "interceptions", color: defence },
  { title: "Blocked Shots", key: "blockedShots", color: defence },
  { title: "Successful Tackles", key: "successfulTackles", color: defence },
  { title: "Clearances", key: "clearances", color: defence },
];
const gkItems = [
  { title: "Saves", key: "saves", color: offence },
  { title: "Penalties Saved", key: "penaltiesSaved", color: offence },
  { title: "Claims/Punches", key: "claimsPunches", color: offence },
  { title: "Sweeper Clearances", key: "sweeperClearances", color: offence },
  { title: "Accurate Passes", key: "accuratePasses", color: defence },
  { title: "Accurate Volleys", key: "accurateVolleys", color: defence },
  { title: "Accurate Throws", key: "accurateThrows", color: defence },
  { title: "Goals Allowed", key: "goalsAllowed", color: badOffence },
  {
    title: "Penalty Goals Allowed",
    key: "penaltyGoalsAllowed",
    color: badOffence,
  },
  { title: "Inaccurate Passes", key: "inaccuratePasses", color: badOffence },
  { title: "Inaccurate Volleys", key: "inaccurateVolleys", color: badOffence },
  { title: "Inaccurate Throws", key: "inaccurateThrows", color: badOffence },
];

const ProfileScreen = ({ navigation }) => {
  const { profile } = navigation.state.params;
  const { name, stats, position, sport } = profile;
  const findAccuracy = (stat1, stat2) => {
    return Math.round((stat1 / (stat1 + stat2)) * 100);
  };
  const per90 = (name) => {
    return Math.round((stats[name] / stats["minutes"]) * 90 * 10) / 10;
  };
  if (position === "Goalkeeper") {
    const savePercentage = findAccuracy(stats["saves"], stats["goalsAllowed"]);
    const accurateDist =
      stats["accuratePasses"] +
      stats["accurateVolleys"] +
      stats["accurateThrows"];
    const inaccurateDist =
      stats["inaccuratePasses"] +
      stats["inaccurateVolleys"] +
      stats["inaccurateThrows"];
    const distributionAccuracy = findAccuracy(accurateDist, inaccurateDist);
    const penaltySavePercentage = findAccuracy(
      stats["penaltiesSaved"],
      stats["penaltyGoalsAllowed"]
    );
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={gkItems}
          keyExtractor={(i) => i.title}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View>
              <ListItem
                title={name}
                subtitle={`${position} / ${sport}`}
                leftIcon={<FontAwesome name="user-circle" size={35} />}
                titleStyle={{ fontSize: 20, fontWeight: "bold" }}
                subTitleStyle={{ fontSize: 18 }}
                containerStyle={styles.nameContainer}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginHorizontal: 5,
                }}
              >
                <PercentCard percent={savePercentage} title="Save Percentage" />
                <PercentCard
                  percent={distributionAccuracy}
                  title="Distribution Accuracy"
                />
                <PercentCard
                  percent={penaltySavePercentage}
                  title="Penalty Save Percentage"
                />
              </View>

              <Text style={styles.label}>Stats per 90 minutes</Text>
            </View>
          }
          renderItem={({ item }) => {
            return (
              <ListItem
                title={item.title}
                containerStyle={styles.liContainer}
                bottomDivider
                rightIcon={
                  <View
                    style={{
                      backgroundColor: item.color,
                      borderRadius: 100,
                      padding: 10,
                      height: 50,
                      width: 50,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      h4
                      style={{ alignSelf: "center" }}
                      h4Style={{ fontSize: 14, color: "#fff" }}
                    >
                      {per90(item.key)}
                    </Text>
                  </View>
                }
              />
            );
          }}
        />
      </SafeAreaView>
    );
  } else {
    const passAccuracy = findAccuracy(
      stats["passesCompleted"],
      stats["passesIncomplete"]
    );
    const shotAccuracy = findAccuracy(
      stats["shotsOnGoal"],
      stats["shotsMissed"]
    );
    const dribbleSuccess = findAccuracy(
      stats["successfulDribbles"],
      stats["unsuccessfulDribbles"]
    );
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={items}
          keyExtractor={(i) => i.title}
          ListHeaderComponent={
            <View>
              <ListItem
                title={name}
                subtitle={`${position} / ${sport}`}
                leftIcon={<FontAwesome name="user-circle" size={35} />}
                titleStyle={{ fontSize: 20, fontWeight: "bold" }}
                subTitleStyle={{ fontSize: 18 }}
                containerStyle={styles.nameContainer}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginHorizontal: 5,
                }}
              >
                <PercentCard percent={shotAccuracy} title="Shot Accuracy" />
                <PercentCard percent={passAccuracy} title="Pass Accuracy" />
                <PercentCard
                  percent={dribbleSuccess}
                  title="Dribble Success Rate"
                />
              </View>

              <Text style={styles.label}>Stats per 90 minutes</Text>
            </View>
          }
          renderItem={({ item }) => {
            return (
              <ListItem
                title={item.title}
                containerStyle={styles.liContainer}
                bottomDivider
                rightIcon={
                  <View
                    style={{
                      backgroundColor: item.color,
                      borderRadius: 100,
                      padding: 10,
                      height: 50,
                      width: 50,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      h4
                      style={{ alignSelf: "center" }}
                      h4Style={{ fontSize: 14, color: "#fff" }}
                    >
                      {per90(item.key)}
                    </Text>
                  </View>
                }
              />
            );
          }}
        />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
    paddingBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  nameContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 5,
    marginTop: 10,
    marginHorizontal: 8,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: "#fff",
    elevation: 3, // Android
  },
  liContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    marginVertical: 3,
    marginHorizontal: 10,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: "#fff",
    elevation: 2, // Android
  },
});

export default ProfileScreen;
