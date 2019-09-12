<template>
  <div class="login-container">
    <div class="login-form">
    <el-row :gutter="20">
      <el-col :lg="6" :sm="10" class="aa">
          <h3>{{ $t("sys.title") }}</h3>
          <el-form
            :model="loginForm"
            status-icon
            :rules="rules"
            ref="loginForm"
            label-width="100px"
            class="login-ruleForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('loginForm')">{{ $t("sys.submit") }}</el-button>
              <el-button @click="resetForm('loginForm')">{{ $t("sys.reset") }}</el-button>
            </el-form-item>
          </el-form>
      </el-col>
    </el-row>
    </div>
  </div>
</template>
<script>
import { userLogin } from "@/api/api";
export default {
  name: "login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.loginForm.checkPass !== "") {
          this.$refs.loginForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        password: "",
        username: ''
      },
      rules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: validateName, trigger: "blur" }]
      }
    };
  },
  methods: {
     submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //这里模拟管理员以及用户两种权限,一般的都是登陆后接口传过来
          userLogin(this.loginForm)
             .then(res => {
               this.$i18n.locale = res.data.lang
               this.$store.commit("COMMIT_TOKEN", res.token);
               this.$store.commit("COMMIT_USER", res.data);
               this.$router.push({
                 path: "/home"
               });
               this.$msg("success",res.msg)
             })
             .catch(err => {
               this.$msg("error", err.msg);
             });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.login-container {
  background: #2d3a4b;
  width: 100%;
  height: 100%;
  position: fixed;
  display: table;
  .login-form {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    color: white;
    font-size: 18px;
    .aa{
      margin: auto;
      float: none;
    }
    h3{
      line-height: 60px;
      margin-left: 100px
    }
    .acount{
      text-align: left
    }
  }
}
</style>

