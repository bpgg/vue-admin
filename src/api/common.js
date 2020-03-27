import { GetCategory } from "@/api/news";
import { reactive } from "@vue/composition-api";

export function common() {
  const category = reactive({
    item: []
  });
  const getCategoryInfo = () => {
    GetCategory({})
      .then(res => {
        category.item = res.data.data.data;
      })
      .catch(err => {});
  };
  return {
    getCategoryInfo,
    category
  };
}
