import { useState, useEffect, useCallback } from "react";
import { SafeAreaView, View, Text, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { getLeaderboard, searchLeaderboard } from "@/redux/leaderboardReducer";
import CustomTextInput from "@/components/CustomTextInput";
import CustomButton from "@/components/CustomButton";

type User = {
  name: string;
  rank: string;
  bananas: string;
  search: boolean;
};

const TableRow = ({ user }: { index: number; length: number; user: User }) => {
  const { name, rank, bananas, search } = user;

  return (
    <View
      style={{
        height: 50,
        flexDirection: "row",
        borderWidth: 1,
        borderTopWidth: 0,
        borderBottomWidth: 1,
      }}
    >
      <View
        style={{
          flex: 2,
          borderWidth: 0,
          borderRightWidth: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: search ? "blue" : "black" }}>{name}</Text>
      </View>
      <View
        style={{
          flex: 1,
          borderWidth: 0,
          borderRightWidth: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: search ? "blue" : "black" }}>{rank}</Text>
      </View>
      <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: search ? "blue" : "black" }}>{bananas}</Text>
      </View>
    </View>
  );
};

const Home = () => {
  const [name, setName] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { leaderboard, filtered } = useSelector((state) => state.leaderboard);
  const dispatch = useDispatch();

  const handleSearch = useCallback(async () => {
    dispatch(searchLeaderboard(name));
    setRefresh((refresh) => !refresh);
  }, [name, filtered]);

  useEffect(() => {
    dispatch(getLeaderboard());
  }, []);

  useEffect(() => {
    if (!filtered) {
      Alert.alert(
        "This user name does not exist! Please specify an existing user name!"
      );
    }
  }, [filtered, refresh]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-start",
            columnGap: 10,
            paddingVertical: 20,
          }}
        >
          <CustomTextInput
            iconName="search"
            inputMode="text"
            autoComplete="name"
            autoCapitalize="none"
            spellCheck={false}
            value={name}
            onChangeText={setName}
          />
          <CustomButton label="Search" onPress={handleSearch} />
        </View>
        {filtered && filtered.length !== 0 && (
          <View style={{ flex: 1 }}>
            <View
              style={{
                height: 50,
                flexDirection: "row",
                borderWidth: 1,
              }}
            >
              <View
                style={{
                  flex: 2,
                  borderWidth: 0,
                  borderRightWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>Name</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  borderWidth: 0,
                  borderRightWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>Rank</Text>
              </View>
              <View
                style={{
                  flex: 2,
                  alignSelf: "stretch",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>Number of bananas</Text>
              </View>
            </View>
            {filtered.map((row, index) => (
              <TableRow key={index} index={index} length={2} user={row} />
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;
