<template>
  <div class="auto-print-wrapper">
    <div class="left-symbol">
      <span>『</span>
    </div>
    <div class="container">
      <el-scrollbar max-height="200px">
        <div class="text">
          <span>{{ activeText }}</span>
        </div>
        <div class="from">
          <span>《{{ word.title }}》{{ word.author ? word.author : '无名' }}</span>
        </div>
      </el-scrollbar>
    </div>
    <div class="right-symbol">
      <span>』</span>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, toRefs } from 'vue';
import { Word } from '../../types'

const props = defineProps({
  word: {
    type: Word,
    default: new Word(),
    require: true,
  }
})
const { word } = toRefs(props);

const activeText = ref('');
let n = 0;
const active = setInterval(() => {
  const char = word.value.text.charAt(n++);
  if (char) { activeText.value += char; }
  else {
    clearInterval(active);
  }
}, 300);

</script>

<style scoped lang='scss'>
.auto-print-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  color: inherit;
  font-size: 30px;

  .left-symbol {
    position: absolute;
    left: 0;
    top: 0;
  }

  .container {
    padding: 10px 40px;
    height: auto;
    max-height: 220px;

    .text {
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        position: relative;

        &::after {
          content: '|';
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

    .from {
      margin-top: 10px;
      font-size: 25px;
    }
  }

  .right-symbol {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}
</style>