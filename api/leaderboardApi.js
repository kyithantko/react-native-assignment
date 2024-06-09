import leaderboard from "./leaderboard.json";

export const fetchLeaderboard = async () => {
  await new Promise((resolve) => setTimeout(() => resolve(), 1000));
  const result = Object.keys(leaderboard)
    .map((key) => leaderboard[key])
    .sort((a, b) => b.bananas - a.bananas)
    .map((item, index) => ({ ...item, rank: index + 1 }));
  return result;
};
