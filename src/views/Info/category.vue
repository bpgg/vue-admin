<template>
  <div class="category-wrap">
    <el-button type="danger" @click="addFirst">添加一级分类</el-button>
    <div class="line"></div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="category-wrap">
          <div
            class="category"
            v-for="firstItem in category.item"
            :key="firstItem.id"
          >
            <h4>
              <svg-icon icon-class="plus"></svg-icon>
              {{ firstItem.id + "-" + firstItem.category_name }}
              <div class="button-group">
                <el-button
                  size="mini"
                  type="danger"
                  round
                  @click="editCategory(firstItem)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="success"
                  round
                  @click="addChildrenCategory(firstItem)"
                  >添加子级</el-button
                >
                <el-button
                  size="mini"
                  round
                  @click="deleteCategoryConfirm(firstItem.id)"
                  >删除</el-button
                >
              </div>
            </h4>
            <ul v-if="firstItem.children">
              <li v-for="secondItem in firstItem.children" :key="secondItem.id">
                {{ secondItem.category_name }}
                <div class="button-group">
                  <el-button size="mini" type="danger" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <h4 class="menu-title">一级分类编辑</h4>
        <el-form label-width="142px" class="form-wrap" ref="categoryForm">
          <el-form-item
            label="一级分类名称："
            prop="categoryName"
            v-if="category_first_input"
          >
            <el-input
              v-model="form.categoryName"
              :disabled="category_first_disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="二级分类名称："
            prop="secCategoryName"
            v-if="category_children_input"
          >
            <el-input
              v-model="form.secCategoryName"
              :disabled="category_child_disabled"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="danger"
              @click="submit"
              :loading="submit_button_loading"
              :disabled="submit_button_disabled"
              >确定</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  AddFirstCategory,
  GetCategory,
  AddChildrenCategory,
  DeleteCategory,
  EditCategory
} from "@/api/news.js";
import { reactive, ref, onMounted } from "@vue/composition-api";
import { global } from "@/utils/global_V3.0";
// import { common } from "@/api/common";
export default {
  name: "InfoCategory",
  setup(props, { root, refs }) {
    // global
    const { str, confirm } = global();
    // const { getCategoryInfo:getCategoryInfo_vue3, category } = common();
    // ref
    const category_first_input = ref(true);
    const category_children_input = ref(true);
    const submit_button_loading = ref(false);
    const category_first_disabled = ref(true);
    const category_child_disabled = ref(true);
    const submit_button_disabled = ref(true);
    const delete_parentId = ref(true);
    // 提交类型
    const submit_type = ref("");
    // 当前的一级id
    const currentId = ref("");
    //定义基础数据和方法
    const form = reactive({
      categoryName: "",
      secCategoryName: ""
    });

    const category = reactive({
      item: []
    });
    /**
     * methods v2.0
     */
    const deleteCategoryConfirm = categoryId => {
      delete_parentId.value = categoryId;
      confirm({
        content: "您确认要删除该信息吗，删除后无法恢复",
        tip: "警告",
        fn: deleteCategory,
        catchFn: () => {
          delete_parentId.value = "";
        }
      });
    };
    // 删除分类
    const deleteCategory = () => {
      let categoryId = delete_parentId.value;
      DeleteCategory({ categoryId })
        .then(res => {
          root.$message({
            message: res.data.message,
            type: "success"
          });
          // es6 findIndex
          let index = category.item.findIndex(item => item.id == categoryId);
          category.item.splice(index, 1);
          // filter
          // let newData = category.item.filter(item => item.id != categoryId);
          // category.item = newData;
          // for (let i = 0; i < category.item.length; i++) {
          //   if (category.item[i].id === categoryId) {
          //     category.item.splice(i, 1);
          //     break;
          //   }
          // }
        })
        .catch(err => {
          console.log(err);
        });
    };
    // 编辑分类
    const editCategory = params => {
      category_first_input.value = true;
      category_first_disabled.value = false;
      submit_button_disabled.value = false;
      category_children_input.value = false;
      form.categoryName = params.category_name;
      submit_type.value = "edit";
      currentId.value = params.id;
    };
    const submitEditCategory = () => {
      EditCategory({
        id: currentId.value,
        categoryName: form.categoryName
      })
        .then(res => {
          root.$message({
            message: res.data.message,
            type: "success"
          });
          //修改成功，数据同到视图。
          let index = category.item.findIndex(
            item => item.id == currentId.value
          );
          console.log(index);
          category.item[index].category_name = form.categoryName;
          submit_button_loading.value = false;
        })
        .catch(err => {
          console.log(err);
          submit_button_loading.value = false;
        });
    };
    // 添加一级分类
    const addFirst = () => {
      category_first_input.value = true;
      category_first_disabled.value = false;
      submit_button_disabled.value = false;
      category_children_input.value = false;
      submit_type.value = "add";
    };
    const submitAddFirst = () => {
      AddFirstCategory({
        categoryName: form.categoryName
      })
        .then(res => {
          root.$message({
            message: res.data.message,
            type: "success"
          });
          category.item.push(res.data.data);

          submit_button_loading.value = false;
        })
        .catch(err => {
          console.log(err);
          submit_button_loading.value = false;
        });
    };
    const addChildrenCategory = params => {
      submit_type.value = "addChild";
      form.categoryName = params.category_name;
      // 显示父子二级，父级不能变化。
      category_first_input.value = true;
      category_children_input.value = true;
      category_first_disabled.value = true;
      category_child_disabled.value = false;
      submit_button_disabled.value = false;
      currentId.value = params.id;
    };
    const submitAddChildrenCategory = () => {
      let requestData = {
        categoryName: form.secCategoryName,
        parentId: currentId
      };
      AddChildrenCategory(requestData)
        .then(res => {
          root.$message({
            type: "success",
            message: res.data.message
          });
          console.log(res);
          submit_button_loading.value = false;
        })
        .catch(err => {
          submit_button_loading.value = false;
        });
    };
    const submit = () => {
      if (!form.categoryName) {
        return root.$message({
          message: "一级分类名称不能为空。",
          type: "error"
        });
      }
      submit_button_loading.value = true;
      if (submit_type.value === "add") {
        submitAddFirst();
      } else if (submit_type.value === "edit") {
        submitEditCategory();
      } else if (submit_type.value === "addChild") {
        submitAddChildrenCategory();
      }
    };
    // 通过 vuex 管理接口
    const getCategoryInfo = () => {
      root.$store.dispatch("common/getCategoryInfo").then(res => {
        console.log(res);
        category.item = res;
      });
    };
    //生命周期
    onMounted(() => {
      getCategoryInfo();
    });
    return {
      //ref
      category_first_input,
      category_children_input,
      submit_button_loading,
      category_first_disabled,
      category_child_disabled,
      submit_button_disabled,
      delete_parentId,
      //reactive
      form,
      category,
      //methods
      editCategory,
      deleteCategoryConfirm,
      submit,
      addFirst,
      addChildrenCategory
    };
  }
};
</script>
<style lang="scss" scoped>
.category-wrap {
  div:first-child {
    &:before {
      top: 20px;
    }
  }
  div:last-child {
    &:before {
      bottom: 21px;
    }
  }
}
.category {
  position: relative;
  line-height: 44px;
  cursor: pointer;
  &::before {
    content: "";
    position: absolute;
    left: 22px;
    top: 15px;
    bottom: 0;
    width: 32px;
    border-left: 1px dotted #000;
  }

  h4 {
    position: relative;
    padding-left: 40px;
  }
  svg {
    position: absolute;
    left: 15px;
    top: 15px;
    background-color: #fff;
    font-size: 17px;
  }
  li {
    position: relative;
    padding-left: 40px;
    margin-left: 24px;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 22px;
      width: 32px;
      border-bottom: 1px dotted #000;
    }
  }
  li,
  h4 {
    @include webkit(transition, all 0.5s ease 0s);
    &:hover {
      background-color: #f3f3f3;
      .button-group {
        display: block;
      }
    }
  }
}
.button-group {
  display: none;
  position: absolute;
  z-index: 2;
  right: 11px;
  top: -1px;
  button {
    font-size: 12px;
  }
}
.menu-title {
  padding-left: 22px;
  background-color: #f3f3f3;
  line-height: 44px;
}
.form-wrap {
  width: 410px;
  padding-top: 26px;
}
.line {
  width: calc(100% + 60px);
  margin: 30px 0 30px -30px;
  height: 1px;
  background-color: #ccc;
}
</style>
