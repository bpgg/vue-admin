<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>
import { computed } from "@vue/composition-api";
export default {
  name: "svgIcon",
  // props: ['iconClass', 'className'],
  props: {
    // 分页
    iconClass: {
      type: String, // 定义接收的值类型
      default: ""
      // required: true,
      // validator: v => {
      //   return v > 0;
      // }
    },
    className: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    // 计算属性，得出最终结果，并返回
    const iconName = computed(() => `#icon-${props.iconClass}`);

    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      } else {
        return `svg-icon`;
      }
    });

    return {
      iconName,
      svgClass
    };
  }
};
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  // currentColor 当前字体的颜色
  fill: currentColor;
}
</style>
