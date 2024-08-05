import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

const app = createApp(App);

const components = [
  import.meta.glob("./components/UI/*.vue", { eager: true }),
  import.meta.glob("./components/form/*.vue", { eager: true }),
];
components.forEach((el) => {
  Object.entries(el).forEach(([path, component]) => {
    app.component(
      path
        .split("/")
        .pop()
        .replace(/\.\w+$/, ""),
      component.default
    );
  });
});
app.mount("#app");
