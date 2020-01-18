<template>
  <div id="header-wrap">
    <div class="fl-left header-icon" @click="swapNavState">
      <svg-icon iconClass="menu" className="menu"></svg-icon>
    </div>
    <div class="fl-right ">
      <div class="fl-left user-info">
        <img src="../../../assets/images/face.jpg" alt="" />
        {{ username }}
      </div>
      <div class="fl-left header-icon" @click="exit">
        <svg-icon iconClass="exit" className="exit"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/composition-api";
import { Message } from "element-ui";
export default {
  name: "layoutHeader",
  // eslint-disable-next-line no-unused-vars
  setup(props, { root }) {
    //定义基础数据和方法
    //生命周期
    const username = computed(() => root.$store.state.app.username);

    const swapNavState = () => {
      root.$store.commit("app/SET_COLLAPSE");
    };

    const exit = () => {
      root.$store
        .dispatch("app/exit")
        // eslint-disable-next-line no-unused-vars
        .then(res => {
          Message.success("退出成功");
          root.$router.push({ name: "Login" });
        })
        .catch(err => {
          console.log(err);
        });
    };
    return {
      username,
      swapNavState,
      exit
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";

#header-wrap {
  position: fixed;
  left: $navMenu;
  right: 0;
  top: 0;
  height: $layoutHeader;
  line-height: $layoutHeader;
  background-color: #fff;
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
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
.open {
  #header-wrap {
    left: $navMenu;
  }
}
.close {
  #header-wrap {
    left: $navMenuMin;
  }
}
</style>
