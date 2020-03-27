import service from "@/utils/request";

// 一级分类添加
export function AddFirstCategory(data) {
  return service.request({
    method: "post",
    url: "/news/addFirstCategory/",
    data
  });
}
// 分类编辑
export function EditCategory(data) {
  return service.request({
    method: "post",
    url: "/news/editCategory/",
    data
  });
}
// 获取分类
export function GetCategory(data) {
  return service.request({
    method: "post",
    url: "/news/getCategory/",
    data
  });
}
// 信息分类添加子级
export function AddChildrenCategory(data) {
  return service.request({
    method: "post",
    url: "/news/addChildrenCategory/",
    data
  });
}
// 删除分类
export function DeleteCategory(data) {
  return service.request({
    method: "post",
    url: "/news/deleteCategory/",
    data
  });
}

// 信息列表内容的获取
export function GetList(data) {
  return service.request({
    method: "post",
    url: "/news/getList/",
    data
  });
}
export function AddInfo(data) {
  return service.request({
    method: "post",
    url: "/news/add/",
    data
  });
}
export function EditInfo(data) {
  return service.request({
    method: "post",
    url: "/news/editInfo/",
    data
  });
}
export function DeleteInfo(data) {
  return service.request({
    method: "post",
    url: "/news/deleteInfo/",
    data
  });
}
