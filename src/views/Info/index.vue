<template>
  <div class="">
    <el-form :inline="true" :gutter="10">
      <el-row :gutter="14">
        <el-col :span="4">
          <div class="label-wrap category">
            <label for="">分类：</label>
            <div class="wrap-content">
              <el-select
                v-model="categorySelected"
                placeholder="请选择"
                style="100%"
              >
                <el-option
                  v-for="item in category.item"
                  :key="item.id"
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
    <el-table
      :data="data.InfoTable"
      border
      style="width: 100%"
      class="table-wrap"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="title" label="标题" width="300"> </el-table-column>
      <el-table-column prop="categoryId" label="分类" width="110">
      </el-table-column>
      <el-table-column prop="createDate" label="日期" width="237">
      </el-table-column>
      <el-table-column prop="user" label="管理员"> </el-table-column>
      <el-table-column label="操作" width="225">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteItem(scope.row.id)"
            >删除</el-button
          >
          <el-button type="success" size="mini" @click="editInfo(scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row>
      <el-col :span="12">
        <el-button @click="deleteAll">批量删除</el-button>
      </el-col>
      <el-col :span="12"
        ><el-pagination
          background
          layout="prev, pager, next,sizes,total,jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :total="data.total"
          :page-sizes="[4, 10, 20, 50]"
          :page-size="requestForm.pageSize"
          class="fl-right"
        >
        </el-pagination
      ></el-col>
    </el-row>

    <!-- 新增弹窗 -->
    <DialogInfo
      :flag.sync="data.dialogInfoVisible"
      @addRowData="addRowData"
      :category="category.item"
    />
    <DialogEditInfo
      :flag.sync="data.dialogEditInfoVisible"
      :category="category.item"
      :rowData="data.currentRowData"
      @updateRowData="updateRowData"
    />
  </div>
</template>

<script>
import { reactive, ref, watch, onMounted } from "@vue/composition-api";
import DialogInfo from "./dialog/info";
import DialogEditInfo from "./dialog/infoEdit";
import { global } from "@/utils/global_V3.0";
import { common } from "@/api/common";
// 引入接口
import { GetList, DeleteInfo } from "@/api/news";
export default {
  name: "InfoIndex",
  components: {
    DialogInfo,
    DialogEditInfo
  },
  setup(props, { root }) {
    /**
     * 数据
     */
    const { confirm } = global();
    const { getCategoryInfo, category } = common();
    // ref
    const date = ref("");
    const categorySelected = ref("");
    const keyword = ref("ID");
    // 初始化页码信息
    const requestForm = reactive({
      categoryId: 0,
      startTiem: "",
      endTime: "",
      title: "",
      id: 0,
      pageNumber: 1,
      pageSize: 4
    });
    const data = reactive({
      InfoTable: [],
      total: 0,
      dialogInfoVisible: false,
      dialogEditInfoVisible: false,
      deleteIds: []
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
    // 获取当前选择的id
    const handleSelectionChange = rows => {
      rows.forEach(e => {
        if (data.deleteIds.indexOf(e.id) === -1) {
          data.deleteIds.push(e.id);
        }
      });
    };

    // 编辑行数据
    const editInfo = row => {
      // 赋值
      data.currentRowData = row;

      data.dialogEditInfoVisible = true;
    };
    // 子组件触发组件更新rowdata
    const updateRowData = rowData => {
      getList();
      // console.log("儿子叫我做事");
      // console.log(rowData.id);
      // let index = data.InfoTable.findIndex(item => item.id == rowData.id);
      // console.log(index);
      // console.log(data.InfoTable[index]);
      // 这样无法改变值。
      // data.InfoTable[index] = rowData;
      // 这样导致数组有问题。
      // data.InfoTable.splice(index, 1, rowData);
    };
    const addRowData = rowData => {
      getList();
    };
    const deleteAll = () => {
      confirm({
        content: "删除全部",
        tip: "提示",
        id: data.deleteIds,
        fn: confirmDelete
      });
    };
    const deleteItem = id => {
      confirm({
        content: "您确定要删除该数据吗？",
        tip: "提示",
        id: [id],
        fn: confirmDelete
      });
    };
    const confirmDelete = ids => {
      DeleteInfo({ id: ids })
        .then(res => {
          root.$message({
            message: res.data.message,
            type: "success"
          });
          // 清空删除的id数组
          data.deleteIds.splice(0, data.deleteIds.length);
          // 重新渲染列表
          getList();
        })
        .catch(err => {});
    };

    const addTabelData = () => {
      data.dialogInfoVisible = true;
      // 新增数据
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
      requestForm.pageSize = val;
      getList();
    };
    const handleCurrentChange = val => {
      requestForm.pageNumber = val;
      getList();
    };
    // 获取信息列表
    const getList = () => {
      GetList(requestForm)
        .then(res => {
          data.InfoTable = res.data.data.data;
          data.total = res.data.data.total;
        })
        .catch(err => {});
    };
    //生命周期
    onMounted(() => {
      getCategoryInfo();
      getList();
    });

    return {
      // ref
      date,
      categorySelected,
      keyword,
      // reactive
      category,
      data,
      options2,
      requestForm,
      // method
      handleSelectionChange,
      updateRowData,
      addRowData,
      editInfo,
      deleteItem,
      deleteAll,
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
