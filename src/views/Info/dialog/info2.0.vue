<template>
  <el-dialog
    title="新增内容"
    :visible.sync="dialogVisible"
    width="30%"
    @close="close"
    center
  >
    <el-form label-width="80px">
      <el-form-item label="类别：" placeholder="请选择活动区域">
        <el-select>
          <el-option :label="1" value="1"> </el-option>
          <el-option :label="2" value="2"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题：">
        <el-input placehoder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="概况：">
        <el-input type="textarea" placehoder="请输入内容"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="danger">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "dialogInfo",
  data() {
    return {
      dialogVisible: false
    };
  },
  // 从父组件获取的值，赋值给子组件一个另外的值，达到单向数据流的目的。
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    flag: {
      // eslint-disable-next-line no-unused-vars
      handler(newValue, oldValue) {
        this.dialogVisible = newValue;
        console.log("监听值改变", newValue);
      }
    }
  },
  methods: {
    close() {
      this.dialogVisible = false;
      this.$emit("update:flag", false);
      // this.$emit("close", false);
    }
  }
};
</script>
<style lang="sass" scoped></style>
