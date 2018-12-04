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
      path: "/players",
      name: "players",

      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Players.vue")
    }
  ]
});
