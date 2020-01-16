<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="contet">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "layoutMain",
  setup(props, context) {
    //定义基础数据和方法
    //生命周期
    return {};
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap {
  position: fixed;
  left: $navMenu;
  top: $layoutHeader;
  right: 0;
  bottom: 0;
  background-color: white;
  box-sizing: border-box;
  border: 30px solid #f7f7f7;
  border-bottom: 0;
}
.open {
  .main-content {
    padding-left: $navMenu + 30;
  }
}
.close {
  .main-content {
    padding-left: $navMenuMin + 30;
  }
}
.main-content {
  width: 100%;
  height: 100%;
  padding-top: $layoutHeader + 30;
  padding-right: 30px;
  @include webkit(box-sizing, border-box);
  @include webkit(transition, all 0.3s ease 0s);
}
</style>
