<template>
  <MenuView>
    <div class="editor-wrapper">
      <div class="title-form">
        <el-form>
          <el-form-item>
            <el-input placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="副标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="所属分类"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="text">
        <MdEditor v-model="text" @onSave="onSave"></MdEditor>
      </div>
    </div>
  </MenuView>
</template>

<script setup lang='ts'>
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const route = useRoute();
const type = ref(1);    // 1：新增  2：修改
if (route.query.type) {
  type.value = Number(route.query.type);
}

const text = ref('');
const onSave = () => {
  console.log(text.value);
}
</script>

<style scoped lang='scss'>
.editor-wrapper {
  height: 100%;
}
</style>