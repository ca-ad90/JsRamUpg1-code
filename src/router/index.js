import { createRouter, createWebHistory } from "vue-router";
import GridView from "../views/GridView.vue";
import InfoView from "../views/InfoView.vue";
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: GridView,
        },
        {
            path: "/search/:title/page/:page?",
            name: "results",
            component: GridView,
        },
        {
            path: "/info/:id/",
            name: "Movie",
            component: InfoView,
        },
        /*     {
          path: '/:searchTitle/:page?',
          name: 'results',
          component: GridView
        }, */

        /*     {
          path: '/:page',
          name: 'home',
        },
        {
          path: "/:details"
        } */
    ],
});

export default router;
