<template>
  <div class="index-wrapper">
    <SnowNew></SnowNew>
    <div class="card">
      <div class="avatar" v-if="cardInfo.avatar">
        <img :src="BaseURL + cardInfo.avatar" alt="" />
      </div>
      <div class="name">
        <span>{{ cardInfo.name }}</span>
      </div>
      <div class="signature">
        <span>{{ actionSignature }}</span>
      </div>
      <div class="technology">
        <span>技术栈：{{ cardInfo.technology }}</span>
      </div>
      <div class="btn-list">
        <div class="blog">
          <button @click="goBlog()">
            博客
          </button>
        </div>
        <div class="github">
          <button>
            <span>GitHub</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useIndexStore } from '../../store';

const BaseURL = __BaseURL__;

const store = useIndexStore();
const router = useRouter();
const goBlog = () => {
  router.push('/blog');
}

const cardInfo = ref(store.info);
const actionSignature = ref('');
const count = ref(0);

const getInfo = async () => {
  cardInfo.value = await store.setInfo();
}
getInfo();


onMounted(() => {
  const iptInterval = setInterval(() => {
    if (cardInfo.value.signature[count.value]) {
      actionSignature.value += cardInfo.value.signature[count.value];
      count.value++;
    }
    else {
      clearInterval(iptInterval);
    }
  }, 500)
})

</script>

<style scoped lang='scss'>
.index-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: url(../../assets/img/bg3.jpg) no-repeat;
  background-position: center;
  background-size: cover;

  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 10px 10px;
    width: 300px;
    height: 500px;
    background: rgba($color: #000000, $alpha: 0.5);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    color: white;
    text-align: center;

    div {
      z-index: 1;
    }

    .avatar {
      width: 150px;
      height: 150px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;

      }
    }

    .name {
      margin: 10px 0 5px;
      width: 100%;
      font-size: 28px;
      font-weight: bold;
    }

    .signature {
      margin-bottom: 10px;
      width: 100%;

      span {
        position: relative;

        &::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 2px;
          height: 100%;
          background-color: white;
          animation: flashing 1s linear infinite;
        }

        @keyframes flashing {

          0%,
          100% {
            opacity: 1;
          }

          50% {
            opacity: 0;
          }
        }

      }
    }

    .technology {
      margin: 10px 0;
      width: 100%;
      word-wrap: break-word;
    }

    .btn-list {
      button {
        position: relative;
        z-index: 1;
        margin: 10px 0;
        height: 50px;
        width: 200px;
        border: none;
        border-radius: 40px;
        background-color: white;
        font-size: 20px;
        letter-spacing: 3px;
        font-weight: bold;
        transition: 0.25s;
        overflow: hidden;
        color: var(--ty-blue);
        cursor: pointer;


        &::before {
          content: '';
          position: absolute;
          z-index: -1;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          border-radius: inherit;
          background-color: var(--ty-blue);
          transition: 0.25s;
        }

        &:hover {
          color: white;

          &::before {
            width: 100%;
          }
        }
      }
    }

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      border: 4px solid #00dbde;
      box-sizing: border-box;
      animation: around 4s linear infinite;
    }

    &::after {
      border-color: #fc00ff;
      animation-delay: -2s;
    }

    @keyframes around {

      0%,
      100% {
        clip-path: inset(95% 0 0 0);
      }

      25% {
        clip-path: inset(0 95% 0 0);
      }

      50% {
        clip-path: inset(0 0 95% 0);
      }

      75% {
        clip-path: inset(0 0 0 95%);
      }
    }
  }
}
</style>