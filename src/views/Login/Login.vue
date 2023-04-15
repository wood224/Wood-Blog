<template>
  <div class="login-wrapper">
    <div class="box">
      <div class="left">
        <h1>{{ title }}，管理员</h1>
      </div>
      <div class="right">
        <div class="title">
          <h2>管理平台</h2>
        </div>
        <div class="form">
          <Input placeholder="账号" v-model="form.username"></Input>
          <Input placeholder="密码" type="password" v-model="form.password"></Input>
          <button @click="login">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router'
import Input from '../../components/Input.vue'
import { adminLoginApi } from '../../api/index'

const router = useRouter();

const title = ref('早上好');
const hour = new Date().getHours();
if (hour > 12 && hour < 13) {
  title.value = '中午好';
} else if (hour > 13 && hour < 18) {
  title.value = '下午好';
} else if (hour > 18) {
  title.value = '晚上好';
}

const form = reactive({
  username: '',
  password: '',
})
const login = () => {
  adminLoginApi(form).then(res => {
    const data = res.data;
    if (data.code === 200) {
      router.push('/');
    } else {
      ElMessage.error(data.msg);
    }
  })
}

</script>

<style scoped lang='scss'>
.login-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #F5F6FA;

  .box {
    display: flex;
    width: 70%;
    height: 600px;
    border-radius: 50px;
    background: white;
    box-shadow: 0px 10px 20px #C1D2FF;
    overflow: hidden;
    text-align: center;


    .left {
      flex: 1;
      background-color: #8CABFF;
      line-height: 600px;
      color: white;
    }

    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 60px;

      .title {
        width: 100%;
        margin: 80px 0;
      }

      .form {
        width: 100%;

        button {
          font-size: 18px;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-align: center;
          font-weight: bold;
          padding: 0.7em 2em;
          border: 3px solid #8CABFF;
          border-radius: 2px;
          position: relative;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.1);
          color: #8CABFF;
          text-decoration: none;
          transition: 0.3s ease all;
          z-index: 1;
          cursor: pointer;
        }

        button:before {
          transition: 0.5s all ease;
          position: absolute;
          top: 0;
          left: 50%;
          right: 50%;
          bottom: 0;
          opacity: 0;
          content: '';
          background-color: #8CABFF;
          z-index: -1;
        }

        button:hover,
        button:focus {
          color: white;
        }

        button:hover:before,
        button:focus:before {
          transition: 0.5s all ease;
          left: 0;
          right: 0;
          opacity: 1;
        }

        button:active {
          transform: scale(0.9);
        }
      }
    }
  }
}

@media screen and (max-width: 992px) {
  .login-wrapper {
    .box {
      width: 90%;

      .left {
        display: none;
      }

      .right {
        padding: 60px 0;
      }
    }
  }
}
</style>