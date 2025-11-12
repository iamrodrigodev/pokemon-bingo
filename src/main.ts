import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, storeKey } from "./store";

const app = createApp(App);

app.use(router);

app.provide(storeKey, store);

app.mount("#app");
