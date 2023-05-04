<template>
  <div class="header-wrapper">
    <div class="left">
      <div class="title">
        <span>Wood's Blog</span>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script setup lang='ts'>

</script>

<style scoped lang='scss'>
.header-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 10px 50px;
  border-bottom: 2px solid rgb(0, 255, 255);
  width: 100%;
  height: 80px;
  background-color: var(--index-bg);

  .left {
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      font-family: 'STLiti';
      font-size: 40px;
      color: white;

      span {
        display: block;
        padding: 6px;
        border-radius: 20px;
      }
    }
  }
}
</style>