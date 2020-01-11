/* eslint-disable no-useless-escape */
/**
 * 过滤特殊字符
 */

export function scriptscript(str) {
  var pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
  );
  var rs = "";
  for (var i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, "");
  }
  return rs;
}

export function validateEmail(value) {
  let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  console.log(reg.test(value));
  return !reg.test(value);
}
/**
 *  验证密码 6-20位的字母+数字
 *
 * @export
 * @param {*} value
 * @returns boolean
 */
export function validatePass(value) {
  let reg = /^(?!\D+$)(?![^a-zA-Z+$]\S{6,20})$/;
  return !reg.test(value);
}
