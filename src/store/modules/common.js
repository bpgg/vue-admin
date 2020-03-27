import { GetCategory } from "@/api/news";
const actions = {
  // 可以回调处理事情
  getCategoryInfo(content, repuestData) {
    return new Promise((resolve, reject) => {
      GetCategory(repuestData)
        .then(response => {
          resolve(response.data.data.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  actions
};
