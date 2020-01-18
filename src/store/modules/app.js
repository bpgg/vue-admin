import { Login } from "@/api/login";
import {
  setToken,
  removeToken,
  removeUsername,
  setUsername,
  getUsername
} from "@/utils/app";
const state = {
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
  to_ken: "",
  username: getUsername() || ""
};

const getters = {
  isCollapse: state => state.isCollapse,
  username: state => state.username
};

const mutations = {
  // 必须的  同步 没有回调处理事情
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse;
    // html5本地储存
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
  },
  SET_TOKEN(state, value) {
    state.to_ken = value;
  },
  SET_USERNAME(state, value) {
    console.log("username" + value);
    state.username = value;
  }
};

const actions = {
  // 可以回调处理事情
  login({ commit }, repuestData) {
    return new Promise((resolve, reject) => {
      Login(repuestData)
        .then(response => {
          let { username, token } = response.data.data;
          commit("SET_TOKEN", token);
          commit("SET_USERNAME", username);
          setToken(token);
          setUsername(username);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  exit({ commit }) {
    return new Promise((resolve, reject) => {
      removeToken();
      removeUsername();
      commit("SET_TOKEN", "");
      commit("SET_USERNAME", "");
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
