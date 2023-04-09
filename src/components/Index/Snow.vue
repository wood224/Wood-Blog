<template>
  <div class="snow-wrapper">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref, toRefs } from 'vue';

const props = defineProps({
  num: {
    type: Number,
    default: 50,
  },
  speed: {
    type: Number,
    default: 1,
  }
})

const canvas = ref<HTMLCanvasElement | null>(null);

const { num, speed } = toRefs(props);

onMounted(() => {
  if (canvas.value) {
    let w = Math.floor(window.innerWidth);
    let h = Math.floor(window.innerHeight);
    canvas.value.width = w;
    canvas.value.height = h;

    const ctx = canvas.value.getContext("2d");

    interface Snow {
      x: number;
      y: number;
      r: number;
    }
    const snows: Array<Snow> = [];

    function getSnows(w: number, h: number) {
      snows.splice(0, num.value);
      for (let i = 0; i < num.value; i++) {
        snows.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 8 + 1
        })
      }
    }
    getSnows(w, h);

    function move() {
      for (let i = 0; i < num.value; i++) {
        const snow = snows[i];
        const m = Math.random() * speed.value + 1;
        snow.x -= m;
        snow.y += m;
        if (snow.x < 0) {
          snow.x = w;
        }
        if (snow.y > h) {
          snow.y = 0;
        }
      }
    }

    function draw() {
      if (ctx) {
        ctx.clearRect(0, 0, w, h);
        ctx.beginPath();
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 10;
        for (let i = 0; i < num.value; i++) {
          const snow = snows[i];
          ctx.moveTo(snow.x, snow.y);
          ctx.arc(snow.x, snow.y, snow.r, 0, 2 * Math.PI);
        }
        ctx.fill();
        ctx.closePath();
        move();
        requestAnimationFrame(draw);
      }
    }

    requestAnimationFrame(draw);

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
}
</style>