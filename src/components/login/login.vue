<template>
  <div class="login">
    <div class="menu-title">
      <div class="back" @click="back">
        <i class="icon iconfont icon-previewleft"></i>
      </div>
      <h2 class="text">登录</h2>
    </div>
    <div class="login-box">
      <div class="inputbox">
        <input type="text" name="username" ref="username" placeholder="用户名" v-model="username">
      </div>
      <div class="inputbox">
        <input type="password" name="password" ref="pwd" placeholder="密码" @keyup.enter="login" v-model="pwd">
      </div>
    </div>
    <div class="remember" @click="toggleRemember">
      <span class="iconfont icon-yes_fill" :class="{'yes': rememberPwd}"></span>记住密码
    </div>
    <div class="login-btn">
      <span class="btn" @click="login">登录</span>
      <span class="btn" @click="register">注册</span>
    </div>
  </div>
</template>
<script>
import { loadFromLocal } from '../../common/js/user'
import { save, load } from '../../common/js/remember'

export default {
  props: {
    logged: {
      type: Boolean
    }
  },
  data() {
    return {
      loggedFn1: this.logged,
      rememberPwd: !!load('rememberPwd'),
      username: load('username'),
      pwd: load('pwd')
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    login() {
      let user = window.localStorage.__user__
      if (user) {
        user = JSON.parse(user)
      }
      let username = this.$refs.username.value
      let pwd = this.$refs.pwd.value

      if (!username || !pwd) {
        alert('用户名或密码为空！')
      } else if (user && user[username] && pwd === loadFromLocal(username, '')) {
        this.loggedFn1 = true
        this.$emit('login-in', this.loggedFn1)
        alert('登录成功！')

        if (this.rememberPwd) {
          save('username', username)
          save('pwd', pwd)
        } else {
          let remember = {}
          remember['username'] = ''
          remember['pwd'] = ''
          window.localStorage.__remember__ = JSON.stringify(remember)
        }

        this.$router.go(-1)
      } else {
        alert('用户名或密码错误！')
      }
    },
    register() {
      this.$router.push('register')
    },
    toggleRemember() {
      this.rememberPwd = !this.rememberPwd
      save('rememberPwd', this.rememberPwd)
      if (!this.rememberPwd) {
        save('username', '')
        save('pwd', '')
      }
    }
  }
}

</script>
<style lang="less" scoped>
@import '../../common/fonts/iconfont.css';

.login {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  background: linear-gradient(rgb(0, 160, 240), #f0f0f0, #f0f0f0, #f0f0f0);
  z-index: 200;

  .menu-title {
    width: 100%;
    height: 50px;
    z-index: 100;

    .back {
      position: absolute;
      top: 5px;
      left: 5px;

      .icon {
        display: block;
        padding: 10px;
        font-size: 20px;
        color: rgb(7, 17, 27);
      }
    }

    .text {
      font-size: 16px;
      line-height: 50px;
      text-align: center;
      color: rgb(7, 17, 27);
    }
  }

  .login-box {
    margin: 20px;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px 2px;
    overflow: hidden;

    .inputbox {
      background-color: #fff;

      input {
        width: 100%;
        height: 40px;
        padding: 25px 30px;
        font-size: 16px;
        line-height: 40px;
        box-sizing: border-box;
      }
    }
  }

  .remember {
    text-align: right;
    padding: 0 20px 20px;
    font-size: 14px;

    .iconfont {
      font-size: 14px;
      margin-right: 2px;
      color: #a0a0a0;

      &.yes {
        color: rgb(0, 160, 240);
      }
    }
  }

  .login-btn {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;

    .btn {
      display: inline-block;
      width: 100%;
      padding: 15px 0;
      margin-bottom: 10px;
      color: #fff;
      box-shadow: rgba(0, 0, 0, 0.1) 0 0 5px 2px;
      border-radius: 10px;
      text-align: center;
      background-color: rgb(0, 160, 240);
    }
  }
}

</style>
