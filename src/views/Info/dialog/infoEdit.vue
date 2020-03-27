<template>
  <el-dialog
    title="修改内容"
    :visible.sync="data.dialog_info_flag"
    width="580px"
    @close="close"
    @opened="openDialog"
    center
  >
    <el-form ref="editInfoForm">
      <el-form-item
        label="类别："
        placeholder="请选择活动区域"
        :label-width="data.formLabelWidth"
      >
        <!-- el-select 需要绑定值。 -->
        <el-select v-model="data.form.categoryId">
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
      <el-form-item label="内容：" :label-width="data.formLabelWidth">
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
import { EditInfo } from "@/api/news";
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
    },
    rowData: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { emit, refs, root }) {
    /** 数据 */
    // ref
    const data = reactive({
      dialog_info_flag: false, // 弹窗标记
      formLabelWidth: "70px",
      form: {
        categoryId: "",
        title: "",
        content: "",
        imgUrl: "",
        id: ""
      },
      // 分类下拉
      categoryOption: [],
      // 按钮加载
      submitLoading: false
    });
    /** methods */
    const close = () => {
      data.dialog_info_flag = false;
      resetForm();
      emit("update:flag", false);
    };
    const openDialog = () => {
      data.categoryOption = props.category;
      let { categoryId, title, content, imgUrl, id } = props.rowData;
      data.form.categoryId = categoryId;
      data.form.title = title;
      data.form.content = content;
      data.form.id = id;
      data.form.imgUrl = imgUrl;
    };
    const resetForm = () => {
      refs.editInfoForm.resetFields();
    };
    // 提交新增info
    const submit = () => {
      data.submitLoading = true;
      EditInfo(data.form)
        .then(res => {
          console.log(res);
          root.$message({
            message: res.data.message + "修改信息成功",
            type: "success"
          });
          // 触发父组件更新数据。 把新的data.form传递回去。
          emit("updateRowData", data.form);
          // 关闭弹窗
          data.dialog_info_flag = false;
          data.submitLoading = false;
          emit("update:flag", false);
          resetForm();
        })
        .catch(err => {
          // 关闭弹窗
          data.dialog_info_flag = false;
          emit("update:flag", false);
          data.submitLoading = false;
          resetForm();
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
