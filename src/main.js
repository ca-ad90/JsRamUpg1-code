import { createApp } from "vue";
import { createPinia } from "pinia";
// eslint-disable-next-line no-unused-vars
//import * as bootstrap from "bootstrap";
import App from "./App.vue";
import router from "./router";
//import "../node_modules/bootstrap/scss/bootstrap.scss";

//import "./assets/main.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
