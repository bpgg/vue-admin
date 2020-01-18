import Vue from "vue";
import App from "./App.vue";
import VueCompositionApi from "@vue/composition-api";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./router/premit";

import "./icons";

Vue.use(ElementUI);
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;

console.log(process.env.NODE_ENV);
console.log(process.env.VUE_APP_ABC);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
