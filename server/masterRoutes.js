const {
  checkStatus,
  addUser,
  getInfoForNavbar,
  logout
} = require("./controllers/accountCtrl");
const {
  profileInfo,
  searchPlayers,
  getAllPlayers
} = require("./controllers/playerCtrl");
const {
  pastTournament,
  upcomingTournament,
  tournamentMatches,
  addTournament,
  getPendingCount,
  getPendingList,
  acceptTournament,
  declineTournament
} = require("./controllers/tournamentCtrl");
const {
  getAllFollowers,
  getAllFollowing,
  addFollowing,
  deleteFollowing,
  getFriendCount
} = require("./controllers/friendCtrl");
const {
  getMatchWinner,
  getMatchLoser,
  getMyMatches,
  getMyStats
} = require("./controllers/matchCtrl");

module.exports = app => {
  app.get("/api/test", (req, res) => {
    res.status(200).json(req.session);
  });
  app.get("/api/status", checkStatus);
  app.post("/api/user", addUser);
  app.get("/api/navbar-info", getInfoForNavbar);
  app.delete("/api/logout", logout);
  app.get("/api/profile/:username", profileInfo);
  app.get("/api/players", searchPlayers);
  app.get("/api/all-players", getAllPlayers);
  app.get("/api/past-tournaments", pastTournament);
  app.get("/api/upcoming-tournaments", upcomingTournament);
  app.get("/api/tournament-matches/:id", tournamentMatches);
  app.get("/api/followers", getAllFollowers);
  app.get("/api/following", getAllFollowing);
  app.post("/api/friend/:id", addFollowing);
  app.delete("/api/deletefriend/:id", deleteFollowing);
  app.get("/api/friendcount", getFriendCount);
  app.post("/api/tournament", addTournament);
  app.get("/api/winmatches", getMatchWinner);
  app.get("/api/losematches", getMatchLoser);
  app.get("/api/get-my-matches", getMyMatches);
  app.get("/api/get-my-stats", getMyStats);
  app.get("/api/tournamentpending", getPendingCount);
  app.get("/api/tournamentpendinglist", getPendingList);
  // app.put("/api/accepttournament/:id", acceptTournament);
  // app.put("/api/declinetournament/:id", declineTournament);
};
