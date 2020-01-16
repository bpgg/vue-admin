<template>
  <div id="layout">
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </div>
</template>

<script>
import LayoutHeader from "./Components/Header";
import LayoutMain from "./Components/Main";
import LayoutNav from "./Components/Nav";
export default {
  name: "Layout",
  components: { LayoutHeader, LayoutMain, LayoutNav },
  setup(props, context) {
    //定义基础数据和方法
    //生命周期
    // onMounted(() => {});
    return {};
  }
};
</script>
<style lang="scss" scoped>
#layout {
  background-color: #f7f7f7;
}
</style>
