<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "layoutMain",
  setup() {
    //定义基础数据和方法
    //生命周期
    return {};
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap {
  height: 100vh;
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
  padding-left: $navMenu + 30;

  @include webkit(box-sizing, border-box);
  @include webkit(transition, all 0.3s ease 0s);
}
.content {
  background: white;
  width: 100%;
  height: 100%;
  @include webkit(box-sizing, border-box);
  padding: 30px 30px 0 30px;
}
</style>
