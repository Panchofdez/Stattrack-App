import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Text, ListItem, Card, SearchBar } from "react-native-elements";
import { fetchGames } from "../store/actions/game";
import Loading from "../components/Loading";
import { FontAwesome } from "@expo/vector-icons";
import dayjs from "dayjs";

const GameHistoryScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.gameHistory);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const filterGames = (gameArr, name) => {
    let nameLower = name.toLowerCase();
    if (name === "") {
      return gameArr;
    } else {
      const newArr = gameArr.filter(
        (game) =>
          game.player.name.toLowerCase().indexOf(nameLower) !== -1 ||
          game.name.toLowerCase().indexOf(nameLower) !== -1
      );
      return newArr;
    }
  };
  const fetch = async () => {
    await dispatch(fetchGames());
    setLoading(false);
  };
  useEffect(() => {
    console.log("arrived");
    fetch();
  }, []);
  if (loading) {
    return <Loading />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={filterGames(games, search)}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View>
              <SearchBar
                placeholder="Filter"
                onChangeText={setSearch}
                lightTheme
                autoCorrect={false}
                containerStyle={styles.searchContainer}
                inputContainerStyle={styles.inputContainer}
                value={search}
              />
              {games.length === 0 && (
                <TouchableOpacity activeOpacity={0.85}>
                  <Card containerStyle={styles.card}>
                    <View style={styles.titleContainer}>
                      <Text style={styles.title}>No games</Text>
                    </View>
                  </Card>
                </TouchableOpacity>
              )}
            </View>
          }
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("GameShow", { game: item })}
                activeOpacity={0.85}
              >
                <Card containerStyle={styles.card}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>{item.name}</Text>
                  </View>
                  <Text style={styles.text}>
                    {dayjs(item.date).format("DD MMM YYYY")}
                  </Text>
                  <ListItem
                    title={item.player.name}
                    subtitle={`${item.player.position} / ${item.player.sport}`}
                    leftIcon={<FontAwesome name="user-circle" size={35} />}
                  />
                </Card>
              </TouchableOpacity>
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
  card: {
    borderRadius: 25,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 2,
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: "#fff",
    elevation: 2, // Android
  },
  text: {
    fontWeight: "bold",
    marginLeft: 15,
  },
  title: {
    fontWeight: "bold",
    marginLeft: 10,
    fontSize: 20,
    marginBottom: 10,
  },
  titleContainer: {
    borderBottomWidth: 1,
    marginBottom: 15,
    marginHorizontal: 5,
    borderColor: "#b0b0b0",
  },
  inputContainer: {
    borderRadius: 25,
    backgroundColor: "#fff",
  },
  searchContainer: {
    borderRadius: 50,
    marginHorizontal: 8,
    marginTop: 10,
    marginBottom: 2,
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
});

export default GameHistoryScreen;
