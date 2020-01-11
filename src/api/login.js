import service from "@utils/request";
/**
 * 获取验证码
 */
export function getCode() {
  service.request({
    method: "post",
    url: "/getCode",
    data: {}
  });
}
/**
 * 登录
 */

/**
 * 注册
 */
