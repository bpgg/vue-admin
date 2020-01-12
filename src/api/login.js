import service from "@/utils/request";
/**
 * 获取验证码
 */
export function GetCode(data={}) {
  return service.request({
    method: "post",
    url: "/getSms/",
    // 在es6中，属性名data和传入的参数值名data一样，则可以直接用data
    data
  });
}
/**
 * 登录
 */

/**
 * 注册
 */
