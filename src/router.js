import Vue from "vue";
// import Router from "vue-router";
import Home from "./views/Home.vue";

// import RsRouter from "./rs-router/index.js";
// 实际执行的是vue install 方法
import RsRouter from "./rs-router/router.js";
Vue.use(RsRouter);
// Vue.use(Router);
export default new RsRouter({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter(from, to, next) {
        console.log(`beforeEnterHome from: ${from} to: ${to}`);
        // 执行next才执行
        setTimeout(() => {
          // 这里可以做任何事情
          next();
        }, 3000);
      }
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue")
    }
  ]
});
// export default new Router({
//   routes: [
//     {
//       path: "/",
//       name: "home",
//       component: Home,
//       beforeEnter(to, from, next) {
//         console.log(`beforeEnterHome from ${from} to ${to}`)
//         setTimeout(() => {
//           next();
//         }, 1500);
//       },
//       beforeLeave(to, from, next) {
//         console.log("leaveHome")
//       }
//     },
//     {
//       path: "/about",
//       name: "about",
//       // route level code-splitting
//       // this generates a separate chunk (about.[hash].js) for this route
//       // which is lazy-loaded when the route is visited.
//       component: () =>
//         import(/* webpackChunkName: "about" */ "./views/About.vue")
//     }
//   ]
// });
