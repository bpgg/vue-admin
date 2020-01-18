import cookie from "cookie_js";

const adminToken = "admin_toKen";
const usernameKey = "username";

export function getToken() {
  return cookie.get(adminToken);
}
export function setToken(value) {
  return cookie.set(adminToken, value);
}
export function removeToken() {
  return cookie.remove(adminToken);
}

export function getUsername() {
  return cookie.get(usernameKey);
}
export function setUsername(value) {
  return cookie.set(usernameKey, value);
}
export function removeUsername() {
  return cookie.remove(usernameKey);
}
