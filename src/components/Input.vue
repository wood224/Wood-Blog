<template>
  <div class="input-wrapper">
    <div class="container">
      <input @focus="iptFocus" @blur="iptBlur" :type="type" v-model="modelValue">
      <div class="text" :class="{ move: textMove }">{{ placeholder }}</div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, toRefs, computed } from 'vue';

const props = defineProps({
  placeholder: {
    type: String,
    default: '请输入',
  },
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: String,
  }
});

const { placeholder, type } = toRefs(props);

const textMove = ref(false)
const iptFocus = () => {
  textMove.value = true;
}
const iptBlur = () => {
  if (modelValue.value !== '') return
  textMove.value = false;
}

const emit = defineEmits(['update:modelValue']);
const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

</script>

<style scoped lang='scss'>
.input-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;

  .container {
    position: relative;
    width: 100%;

    input {
      padding: 10px 0;
      width: 100%;
      border-bottom: 2px solid black;
      font-size: 20px;

      &:focus {
        border-color: #8CABFF;
        caret-color: #8CABFF;
      }
    }

    .text {
      position: absolute;
      top: 10px;
      left: 0px;
      width: 100%;
      height: 100%;
      text-align: start;
      color: gray;
      font-size: 16px;
      transition: 0.5s;
      pointer-events: none;
      user-select: none;

      &.move {
        transform: translateY(-100%);
        font-size: 20px;
        color: black;
      }
    }

  }
}
</style>