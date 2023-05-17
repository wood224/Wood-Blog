<template>
  <div class="snow-wrapper">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { getAssets } from '../../util/getAssets';

const canvas = ref<HTMLCanvasElement | null>(null);


onMounted(() => {
  if (canvas.value) {
    let w = Math.floor(window.innerWidth);
    let h = Math.floor(window.innerHeight);
    canvas.value.width = w;
    canvas.value.height = h;

    const ctx = canvas.value.getContext("2d");

    interface SnowArr {
      x: number;
      y: number;
      toX: number;
      toY: number;
      size: number;
    }
    const config = {
      number: 100,  // 生成的雪花数量
      snowArr: [] as SnowArr[],
      pic: getAssets('snow.png')  // 雪花图片
    }
    let snowImg = new Image()
    snowImg.src = config.pic

    const getSnows = (w: number, h: number) => {
      config.snowArr.slice(0, config.snowArr.length);
      for (let i = 0; i < config.number; i++) {
        config.snowArr.push({
          x: Math.random() * w,  // 定义每片雪花的X轴
          y: Math.random() * h,  // Y轴
          toX: Math.random(),  // 雪花每一次渲染的X距离
          toY: Math.random() * 1 + 1,
          size: Math.random() * 20 + 1  // 雪花的大小
        })
      }
    }
    getSnows(w, h);

    const dropAnimation = () => {
      if (ctx) {
        ctx.clearRect(0, 0, w, h)  // 清除画布重新渲染
        for (let i = 0; i < config.snowArr.length; i++) {
          let snow = config.snowArr[i]
          // ctx.beginPath()  //绘制圆形雪花 后面直接图片代替
          // ctx.arc(snow.x, snow.y, snow.size, 0, Math.PI * 2, true)
          // ctx.fillStyle = "#fff"
          // ctx.fill()
          ctx.drawImage(snowImg, snow.x, snow.y, snow.size, snow.size)

          snow.x = snow.x > w ? 0 : snow.x + snow.toX  // 每调一次函数向右移动一点
          snow.y = snow.y > h ? 0 : snow.y + snow.toY   // 向下移动
        }
        requestAnimationFrame(dropAnimation)
      }
    }
    requestAnimationFrame(dropAnimation);

    window.addEventListener('resize', () => {
      w = Math.floor(window.innerWidth);
      h = Math.floor(window.innerHeight);
      if (canvas.value !== null) {
        canvas.value.width = w;
        canvas.value.height = h;
        getSnows(w, h);
      }
    })
  }
})

</script>

<style scoped lang='scss'>
canvas {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100vw;
  height: 100vh;
  transform: rotateY(180deg);
}
</style>