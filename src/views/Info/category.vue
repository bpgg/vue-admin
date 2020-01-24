<template>
  <div class="category-wrap">
    <el-button type="danger">添加一级分类</el-button>
    <div class="line"></div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="category-wrap">
          <div class="category">
            <h4>
              <svg-icon icon-class="plus"></svg-icon>
              一级分类
              <div class="button-group">
                <el-button size="mini" type="danger" round>编辑</el-button>
                <el-button size="mini" type="success" round>添加子级</el-button>
                <el-button size="mini" round>删除</el-button>
              </div>
            </h4>
            <ul>
              <li>
                123
                <div class="button-group">
                  <el-button size="mini" type="danger" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </li>
              <li>123</li>
              <li>123</li>
              <li>123</li>
              <li>123</li>
              <li>123</li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <h4 class="menu-title">一级分类编辑</h4>
        <el-form label-width="142px" class="form-wrap" ref="categoryFrom">
          <el-form-item label="一级分类名称：" prop="categoryName">
            <el-input v-model="form.categoryName"></el-input>
          </el-form-item>
          <el-form-item label="二级分类名称：" prop="secCategoryName">
            <el-input v-model="form.secCategoryName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="submit">确定</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/composition-api";
export default {
  name: "InfoCategory",
  setup() {
    //定义基础数据和方法
    const form = reactive({
      categoryName: "",
      secCategoryName: ""
    });

    const submit = () => {};
    //生命周期
    return {
      form,
      submit
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
