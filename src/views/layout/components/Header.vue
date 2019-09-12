<template>
  <div class="head-container clearfix">
    <div class="header-left">
      <showAside :toggle-click="toggleClick"/>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 消息中心 -->
        <div class="btn-bell">
          <el-tooltip effect="dark" :content="usermsg?`有${usermsg}条未读消息`:`消息中心`" placement="bottom">
            <router-link to="/tabs">
             <i class="el-icon-bell"></i>
             </router-link>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="usermsg"></span>
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img
              :src="userimage"
              class="user-avatar"
            >
            {{ username }}<i class="el-icon-caret-bottom"/>
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link class="inlineBlock" to="/home">
              <el-dropdown-item>{{ $t("menu.home") }}</el-dropdown-item>
            </router-link>
            <el-dropdown-item @click.native="dialogVisible = true" >{{ $t("menu.userSettings") }}</el-dropdown-item>
            <el-dropdown-item divided>
              <span style="display:block;" @click="out">{{ $t("menu.logout") }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div>
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <div slot="title">{{ $t(dialogTitle) }}</div>
      <el-radio v-model="lang" label="zh" @click="changeLanguage('zh')">简体中文</el-radio>
      <el-radio v-model="lang" label='en' @click="changeLanguage('en')">English</el-radio>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t("sys.cancel") }}</el-button>
        <el-button type="primary" @click="changeSettings()">{{ $t("sys.determine") }}</el-button>
      </span>
    </el-dialog>
  </div>
  </div>
</template>
<script>
import { userLogout } from "@/api/api";
import showAside from "./showAside.vue";
export default {
  name:'Header',
  components: {
    showAside
  },
  data() {
      return {
        dialogVisible:false,
        dialogTitle:"menu.userSettings",
        lang: this.$store.state.user.lang,
        theme: this.$store.state.user.them,
        collapse: false,
        fullscreen: false,
      }
    },
  computed: {
    isCollapse: {
      get: function() {
        return this.$store.state.isCollapse;
      },
      set: function(newValue) {
        this.$store.commit("IS_COLLAPSE", newValue);
      }
    },
    username(){
      let username = this.$store.state.user.name
      return username ? username : this.name;
    },
    userimage(){
      let userimage = this.$store.state.user.image
      return userimage ? userimage : this.userimage;
    },
    usermsg(){
       let usermsg = 2
      return usermsg ? usermsg : this.usermsg;
    },
  },
  methods: {
    changeSettings() {
      if (this.lang != ''){
        this.$i18n.locale = this.lang
        this.$store.commit('COMMIT_I18N',this.lang)
        this.dialogVisible=false
      } 
      this.dialogVisible=false

    },
    toggleClick() {
      this.isCollapse = !this.isCollapse;
    },
    // 用户名下拉菜单选择事件
    out() {
      userLogout()
             .then(res => {
              this.$store.commit('TAGES_LIST',[])
              this.$store.commit('COMMIT_USER',[])
              this.$store.commit("COMMIT_TOKEN", []);
              this.$router.push("/login");
              this.$msg("success",res.msg)
             })
             .catch(err => {
               this.$msg("error", err.msg);
             });
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  }
}; 
</script>
<style lang="scss" scoped>
.head-container {
  height: 50px;
  line-height: 50px;
  -webkit-box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12),
    0 0 3px 0 rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  border-bottom: 1px solid #f0f0f0;
}
.header-left {
  float: left;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 50px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}

.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
  margin-bottom: 10px;
}
.btn-bell{
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
  font-size: 24px;
  margin-right: 20px;
  margin-bottom: 15px;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: 8px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
}
.btn-bell .el-icon-bell {
  color: #666;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
.avatar-container {
  height: 50px;
  display: inline-block;
  // position: absolute;
  // right: 35px;
  .avatar-wrapper {
    cursor: pointer;
    margin-top: 5px;
    position: relative;
    line-height: initial;
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }
    .el-icon-caret-bottom {
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
    }
  }
}
</style>


