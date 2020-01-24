import Vue from "vue";
import App from "./App.vue";
import VueCompositionApi from "@vue/composition-api";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./router/premit";
// 自定义全局方法
import global from "@/utils/global.js";
import "./icons";

Vue.use(global);
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
