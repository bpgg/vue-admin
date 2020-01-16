<template>
  <div id="header-wrap">
    <div class="fl-left header-icon">
      <svg-icon iconClass="menu" className="menu"></svg-icon>
    </div>
    <div class="fl-right ">
      <div class="fl-left user-info">
        <img src="../../../assets/images/face.jpg" alt="" />
        {{ username }}
      </div>
      <div class="fl-left header-icon">
        <svg-icon iconClass="exit" className="exit"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";
export default {
  name: "layoutHeader",
  // eslint-disable-next-line no-unused-vars
  setup(props, context) {
    //定义基础数据和方法
    //生命周期
    const username = ref("瑞恒");
    return {
      username
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-wrap {
  position: fixed;
  left: 250px;
  right: 0;
  top: 0;
  height: $layoutHeader;
  line-height: $layoutHeader;
  background-color: #fff;
  -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
}
.header-icon {
  padding: 0 32px;
  svg {
    font-size: 25px;
    margin-bottom: -8px;
    cursor: pointer;
  }
}
.user-info {
  height: 100%;
  border-right: 1px solid #ededed;
  padding: 0 32px;
  + .header-icon {
    padding: 0 28px;
  }
  img {
    // width: 50px;
    // height: 50px;
    display: inline-block;
    border-radius: 50px;
    margin-bottom: -12px;
    margin-right: 18px;
  }
}
</style>
