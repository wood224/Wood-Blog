<template>
  <div class="stick-note-wrapper">
    <div class="container">
      <div class="name">
        {{ name }}
      </div>
      <div class="content">
        {{ content }}
      </div>
      <div class="time">
        {{ time }}
      </div>
    </div>
    <div class="roll-angle"></div>
  </div>
</template>

<script setup lang='ts'>
import { toRefs } from 'vue';

const props = defineProps({
  name: {
    type: String,
    require: true,
    default: '',
  },
  content: {
    type: String,
    require: true,
    default: '',
  },
  time: {
    type: String,
    require: true,
    default: '',
  }
})
const { name, content, time } = toRefs(props);

</script>

<style scoped lang='scss'>
.stick-note-wrapper {
  position: relative;
  width: 100%;
  height: auto;
  word-wrap: break-word;
  color: black;


  .container {
    background-color: #FEFECB;
    padding: 20px;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 40px 100%, 0 calc(100% - 40px));
    box-shadow: var(--el-box-shadow);


    .name {
      font-size: 24px;
      font-weight: bold;
    }

    .content {
      margin: 20px 0;
    }

    .time {
      text-align: right;
      font-size: 14px;
      color: var(--el-text-color-secondary);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 30px;
    height: 60px;
    z-index: 10;
    transform-origin: 25% 25%;
    transform: rotate(-30deg) translate(-50%, -50%);
    background-color: rgba($color: #fff, $alpha: 0.2);
    box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.04), 0px 8px 20px rgba(0, 0, 0, 0.08);
  }
}
</style>