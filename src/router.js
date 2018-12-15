import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/chat",
      name: "chat",

      component: () => import("./views/Chat.vue")
    },
    {
      path: "/",
      name: "dashboard",

      component: () => import("./views/Dashboard.vue")
    },
    {
      path: "/friends",
      name: "friends",

      component: () => import("./views/Friends.vue")
    },
    {
      path: "/tournaments",
      name: "tournaments",

      component: () => import("./views/Tournaments.vue")
    },
    {
      path: "/search",
      name: "search",

      component: () => import("./views/Search.vue")
    },
    {
      path: "/profile/:username",
      name: "profile",

      component: () => import("./views/Profile.vue")
    },
    {
      path: "/standings",
      name: "standings",

      component: () => import("./views/Standings.vue")
    },
    {
      path: "/tournament/view/:id",
      name: "tournamentView",

      component: () => import("./views/TournamentView.vue")
    },
    {
      path: "/newtournament",
      name: "newtournament",

      component: () => import("./components/NewTournament.vue")
    },
    {
      path: "/addtournamentplayers",
      name: "addtournamentplayers",

      component: () => import("./components/AddTournamentPlayers.vue")
    },
    {
      path: "/tournament/edit/:id",
      name: "tournamentEdit",

      component: () => import("./views/EditTournament.vue")
    },
    {
      path: "/tournament/started/:id",
      name: "startedTournament",

      component: () => import("./views/StartedTournament.vue")
    }
  ]
});
