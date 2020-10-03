import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import GameResults from "../components/GameResults";

const GameShowScreen = ({ navigation }) => {
  const { game } = navigation.state.params;
  const { stats, minutes, player, name } = game;
  useEffect(() => {
    navigation.setParams({ title: name });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <GameResults stats={stats} minutes={minutes} player={player} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
    paddingBottom: 10,
    backgroundColor: "#f9f9f9",
  },
});

export default GameShowScreen;
