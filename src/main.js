import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createHead, useHead } from "@vueuse/head"

import "./assets/style.css";
import "./assets/tailwind.css";

const app = createApp(App);
const head = createHead()

app.use(router);
app.use(head);

useHead({
    title: "متجر خلخال"
})

app.mount("#app");
