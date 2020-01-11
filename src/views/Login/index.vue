<!-- login-vue -->
<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="menu in menuTab"
          :class="{ current: menu.isActive }"
          :key="menu.id"
          @click="switchTab(menu)"
        >
          {{ menu.txt }}
        </li>
      </ul>
      <el-form
        :model="loginForm"
        status-icon
        :rules="loginRules"
        ref="loginForm"
        class="login-form"
      >
        <el-form-item prop="email" class="item">
          <label for="">邮箱</label>
          <el-input
            type="text"
            v-model="loginForm.email"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass" class="item">
          <label for="">密码</label>
          <el-input
            type="password"
            v-model="loginForm.pass"
            auto-complete="off"
            min-length="6"
            max-length="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass2" class="item" v-show="model === 'register'">
          <label for="">再次输入密码</label>
          <el-input
            type="password"
            v-model="loginForm.pass2"
            auto-complete="off"
            min-length="6"
            max-length="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item">
          <label for="">验证码</label>
          <el-row :gutter="20">
            <el-col :span="15"
              ><el-input v-model.number="loginForm.code"></el-input
            ></el-col>
            <el-col :span="9"
              ><el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('loginForm')"
            class="login-btn"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validateEmail, validatePass } from "@/utils/validate";
import { reactive, ref, onMounted, onUpdated } from "@vue/composition-api";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "login",
  setup(props, context) {
    // 这里放置 data，生命周期函数，自定义函数
    // 表单验证函数
    var _validateEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      } else if (validateEmail(value)) {
        return callback(new Error("邮箱格式有误"));
      } else {
        return callback();
      }
    };
    var _validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (validatePass(value)) {
        callback(new Error("密码应为6-20位"));
      } else {
        callback();
      }
    };
    var _validatePass2 = (rule, value, callback) => {
      if (model.value === "login") callback();
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== loginForm.pass) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    var validatecode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("验证码不能为空"));
      }
      callback();
    };
    const menuTab = reactive([
      { txt: "登录", isActive: true, type: "login" },
      { txt: "注册", isActive: false, type: "register" }
    ]);

    const model = ref("login");
    // 表单验证数据
    const loginForm = reactive({
      email: "",
      pass: "",
      code: "",
      pass2: ""
    });
    // 表单验证规则
    const loginRules = reactive({
      email: [{ validator: _validateEmail, trigger: "blur" }],
      pass: [{ validator: _validatePass, trigger: "blur" }],
      pass2: [{ validator: _validatePass2, trigger: "blur" }],
      code: [{ validator: validatecode, trigger: "blur" }]
    });

    const switchTab = data => {
      menuTab.forEach(e => {
        e.isActive = false;
      });
      data.isActive = true;
      model.value = data.type;
    };
    const submitForm = formName => {
      context.refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    onMounted(() => {});
    onUpdated(() => {});
    return {
      menuTab,
      model,
      loginForm,
      loginRules,
      switchTab,
      submitForm
    };
  },
  onMounted() {},
  components: {},

  //计算属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {}
};
</script>
<style lang="scss" scoped>
#login {
  widows: 100%;
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
  }
  .current {
    background-color: rgba($color: #000000, $alpha: 0.1);
  }
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .login-btn {
    width: 100%;
    margin-top: 20px;
  }
  .item {
    margin-bottom: 20px;
  }
  .block {
    display: block;
    width: 100%;
  }
}
</style>
