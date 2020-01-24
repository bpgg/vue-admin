<template>
  <div class="">
    <el-form :inline="true" :gutter="10">
      <el-row :gutter="14">
        <el-col :span="4">
          <div class="label-wrap category">
            <label for="">类型：</label>
            <div class="wrap-content">
              <el-select v-model="category" placeholder="请选择" style="100%">
                <el-option
                  v-for="item in options.category"
                  :key="item.value"
                  :label="item.category_name"
                  :value="item.id"
                  :disabled="item.disabled"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="label-wrap date">
            <label for="">日期：</label>
            <div class="wrap-content">
              <el-date-picker
                v-model="date"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width:100%"
              >
              </el-date-picker>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="label-wrap keyword">
            <label for="">关键字：</label>
            <div class="wrap-content">
              <el-select
                v-model="keyword"
                placeholder="请选择"
                style="width:100%;"
              >
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <el-form-item>
            <el-input placeholder="请输入内容" style="width: 100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button type="danger" style="width:100%">搜索</el-button>
        </el-col>
        <el-col :span="3">&nbsp;</el-col>
        <!-- <el-col :span="2">&nbsp;</el-col> -->
        <el-col :span="2" class="fl-right">
          <el-button type="danger" style="width:100%" @click="addTabelData"
            >新增</el-button
          >
        </el-col>
      </el-row>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%" class="table-wrap">
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="title" label="标题" width="830"> </el-table-column>
      <el-table-column prop="category" label="分类" width="130">
      </el-table-column>
      <el-table-column prop="date" label="日期" width="237"> </el-table-column>
      <el-table-column prop="user" label="管理员"> </el-table-column>
      <el-table-column label="操作" width="225">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteItem(scope.row.id)"
            >删除</el-button
          >
          <el-button type="success" size="mini" @click="editInfo(scope.row.id)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row>
      <el-col :span="12">
        <el-button>批量删除</el-button>
      </el-col>
      <el-col :span="12"
        ><el-pagination
          background
          layout="prev, pager, next,sizes,total,jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :total="1000"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="10"
          class="fl-right"
        >
        </el-pagination
      ></el-col>
    </el-row>

    <!-- 新增弹窗 -->
    <DialogInfo :flag.sync="dialogInfoVisible" :category="options.category" />
    <!-- <DialogInfo :flag="dialogInfoVisible" @close="closeDialog" /> -->
  </div>
</template>

<script>
import { reactive, ref } from "@vue/composition-api";
import DialogInfo from "./dialog/info";
import { global } from "@/utils/global_V3.0";
export default {
  name: "InfoIndex",
  components: {
    DialogInfo
  },
  setup(props, { root }) {
    /**
     * 数据
     */
    const { str: aaa, confirm } = global();
    const dialogInfoVisible = ref(false);
    const date = ref("");
    const category = ref("国际信息");
    const keyword = ref("ID");
    const form = reactive({
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: ""
    });
    const tableData = reactive([
      {
        title: "测试标题",
        category: "国际信息",
        date: "2020-01-23",
        user: "管理员"
      },
      {
        title: "测试标题",
        category: "国际信息",
        date: "2020-01-23",
        user: "管理员"
      },
      {
        title: "测试标题",
        category: "国际信息",
        date: "2020-01-23",
        user: "管理员"
      },
      {
        title: "测试标题",
        category: "国际信息",
        date: "2020-01-23",
        user: "管理员"
      }
    ]);

    const options = reactive({
      category: [
        {
          id: "选项1",
          category_name: "国际信息"
        },
        {
          id: "选项2",
          category_name: "国内信息"
          // disabled: true
        },
        {
          id: "选项3",
          category_name: "行内信息"
        }
      ]
    });
    const options2 = reactive([
      {
        value: "选项1",
        label: "ID"
      },
      {
        value: "选项2",
        label: "标题"
      }
    ]);

    /**
     * 方法
     */
    // const closeDialog = flag => {
    //   console.log(111);
    //   dialogInfoVisible.value = flag;
    // };
    const deleteItem = () => {
      // 直接注册vue原型对象上
      // root.confirm({
      //   content: "内容",
      //   tip: "提示",
      //   id: "001",
      //   fn: () => {
      //     alert("删除成功");
      //   }
      // });
      // Vue3.0
      confirm({
        content: "内容2",
        tip: "提示",
        id: "001",
        fn: () => {
          // alert("删除成功");
          console.log("删成");
        }
      });
    };
    const addTabelData = () => {
      dialogInfoVisible.value = true;
      console.log("new");
    };
    const handleClose = done => {
      root
        .$confirm("确认关闭")
        // eslint-disable-next-line no-unused-vars
        .then(_ => {
          done();
        })
        // eslint-disable-next-line no-unused-vars
        .catch(_ => {});
    };
    const handleSizeChange = val => {
      console.log(`每页 ${val} 条`);
    };
    const handleCurrentChange = val => {
      console.log(`当前页: ${val}`);
    };

    //生命周期
    return {
      // ref
      dialogInfoVisible,
      date,
      category,
      keyword,
      // reactive
      form,
      tableData,
      options,
      options2,
      // method
      deleteItem,
      addTabelData,
      handleClose,
      handleSizeChange,
      handleCurrentChange
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.table-wrap {
  margin: 30px 0;
}
.label-wrap {
  &.category {
    @include labelDom(left, 60, 40);
  }
  &.date {
    @include labelDom(right, 93, 40);
  }
  &.keyword {
    @include labelDom(right, 99, 40);
  }
}
</style>
