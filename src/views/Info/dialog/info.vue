<template>
  <el-dialog
    title="新增内容"
    :visible.sync="data.dialog_info_flag"
    width="580px"
    @close="close"
    @opened="openDialog"
    center
  >
    <el-form ref="addInfoForm">
      <el-form-item
        label="类别："
        placeholder="请选择活动区域"
        :label-width="data.formLabelWidth"
      >
        <!-- el-select 需要绑定值。 -->
        <el-select v-model="data.form.category">
          <el-option
            v-for="item in data.categoryOption"
            :key="item.id"
            :label="item.category_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题：" :label-width="data.formLabelWidth">
        <el-input placehoder="请输入标题" v-model="data.form.title"></el-input>
      </el-form-item>
      <el-form-item label="概况：" :label-width="data.formLabelWidth">
        <el-input
          type="textarea"
          placehoder="请输入内容"
          v-model="data.form.content"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="danger" :loading="data.submitLoading" @click="submit"
        >确定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { watch, reactive } from "@vue/composition-api";
import { AddInfo } from "@/api/news";
export default {
  name: "dialogInfo",
  // 从父组件获取的值，赋值给子组件一个另外的值，达到单向数据流的目的。
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    category: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit, refs, root }) {
    /** 数据 */
    // ref
    const data = reactive({
      dialog_info_flag: false, // 弹窗标记
      formLabelWidth: "70px",
      form: {
        category: "",
        title: "",
        content: ""
      },
      // 分类下拉
      categoryOption: [],
      // 按钮加载
      submitLoading: false
    });
    /** methods */
    const close = () => {
      data.dialog_info_flag = false;
      emit("update:flag", false);
      resetForm();
    };
    const openDialog = () => {
      console.log(props.category);
      data.categoryOption = props.category;
    };
    const resetForm = () => {
      refs.addInfoForm.resetFields();
    };
    // 提交新增info
    const submit = () => {
      data.submitLoading = true;
      AddInfo(data.form)
        .then(res => {
          root.$message({
            message: res.data.message + "添加信息成功",
            type: "success"
          });
          // 关闭弹窗
          data.dialog_info_flag = false;
          console.log(res);
          emit("update:flag", false);
          // 本来以为返回的值可以传递给父组件。
          emit("addRowData", {});
          // 按钮状态还原
          data.submitLoading = false;
          resetForm();
        })
        .catch(err => {
          // 关闭弹窗
          data.dialog_info_flag = false;
          emit("update:flag", false);
          data.submitLoading = false;
          resetForm();
          console.log(err);
        });
    };
    // watch
    watch(() => (data.dialog_info_flag = props.flag));
    return {
      data,
      // methods
      close,
      submit,
      resetForm,
      openDialog
    };
  }
};
</script>
<style lang="sass" scoped></style>
