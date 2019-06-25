<template>
  <div class="register">
    <div class="menu-title">
      <div class="back" @click="back">
        <i class="icon iconfont icon-previewleft"></i>
      </div>
      <h2 class="text">注册</h2>
    </div>
    <div class="register-box">
      <div class="inputbox">
        <input type="text" name="username" ref="username" placeholder="用户名">
      </div>
      <div class="inputbox">
        <input type="password" name="password" ref="pwd" placeholder="密码">
      </div>
      <div class="inputbox">
        <input type="password" name="password" ref="repPwd" placeholder="确认密码">
      </div>
    </div>
    <div class="register-btn" @click="register">
      <span class="btn">完成注册</span>
    </div>
  </div>
</template>
<script>
import { saveToLocal } from '../../common/js/user'
export default {
  props: {
    users: {
      type: Array
    }
  },
  data() {
    return {
      usersFn1: []
    }
  },
  methods: {
    back() {
      this.$router.back(-1)
    },
    register() {
      let username = this.$refs.username.value
      let pwd = this.$refs.pwd.value
      let repPwd = this.$refs.repPwd.value
<<<<<<< HEAD
      saveToLocal(username, pwd)
      // if (!username || !pwd || !repPwd) {
      //   alert('用户名或密码为空！')
      //   return
      // }
      // if (pwd !== repPwd) {
      //   alert('两次输入的密码不一致！')
      //   return
      // }
=======
      if (!username || !pwd || !repPwd) {
        alert('用户名或密码为空！')
        return
      }
      if (pwd !== repPwd) {
        alert('两次输入的密码不一致！')
        return
      }

      let user = window.localStorage.__user__
      if (!user[username]) {
        alert('用户名已存在！')
        return
      }
>>>>>>> 完成支付的流程
      // let user = {}
      // user.id = username
      // user.pwd = pwd
      // this.usersFn1.push(user)
      // this.$emit('registerFn1', this.usersFn1)
<<<<<<< HEAD
      // alert('注册成功！')
      // this.$router.push('login')
=======
      saveToLocal(username, pwd)
      alert('注册成功！')
      this.$router.push('login')
>>>>>>> 完成支付的流程
    }
  }
}

</script>
<style lang="less" scoped>
@import '../../common/fonts/iconfont.css';

.register {
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

  .register-box {
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

  .register-btn {
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
