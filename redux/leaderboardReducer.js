import { fetchLeaderboard } from "@/api/leaderboardApi";

export function leaderboardReducer(
  state = { leaderboard: [], filtered: [] },
  action
) {
  switch (action.type) {
    case "leaderboard/set":
      return { ...state, leaderboard: action.leaderboard };
    case "leaderboard/search":
      const found = state.leaderboard.find((item) => item.name === action.name);
      if (found) {
        const topTen = state.leaderboard.slice(0, 10);
        const isInTopTen = topTen.findIndex((item) => item.uid === found.uid);
        const foundInTopTen = topTen.find((item) => item.uid === found.uid);
        if (isInTopTen !== -1) {
          topTen[isInTopTen] = { ...foundInTopTen, search: true };
          return { ...state, filtered: topTen };
        } else {
          const topNine = state.leaderboard.slice(0, 9);
          topNine.push({ ...found, search: true });
          return { ...state, filtered: topNine };
        }
      }
      return { ...state, filtered: null };
    default:
      return state;
  }
}

export const setLeaderboard = (leaderboard) => {
  return {
    type: "leaderboard/set",
    leaderboard,
  };
};

export const searchLeaderboard = (name) => {
  return {
    type: "leaderboard/search",
    name,
  };
};

export const getLeaderboard = () => {
  return async (dispatch) => {
    const leaderboard = await fetchLeaderboard();
    dispatch(setLeaderboard(leaderboard));
  };
};
