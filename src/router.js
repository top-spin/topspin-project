import Vue from "vue";
import Router from "vue-router";
// import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/account",
      name: "account",

      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Account.vue")
    },
    {
      path: "/chat",
      name: "chat",

      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Chat.vue")
    },
    {
      path: "/",
      name: "dashboard",

      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Dashboard.vue")
    },
    {
      path: "/friends",
      name: "friends",

      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Friends.vue")
    },
    {
      path: "/tournaments",
      name: "tournaments",

      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Tournaments.vue")
    },
    {
      path: "/search",
      name: "search",

      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Search.vue")
    },
    {
      path: "/profile/:username",
      name: "profile",

      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Profile.vue")
    },
    {
      path: "/standings",
      name: "standings",

      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Standings.vue")
    },
    {
      path: "/tournament/view/:id",
      name: "tournamentView",

      component: () =>
        import(/* webpackChunkName: "about" */ "./views/TournamentView.vue")
    }
  ]
});
