<template>
  <button
    class="btn"
    :class="[props.btnType, props.btnSize]"
    @click="handleClick">
    {{ props.btnText }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  btnType: string;
  btnText: string;
  btnSize: string;
}>();

const emit = defineEmits<{
  (event: "emitHandleClick"): void;
}>();

const handleClick = (event: Event) => {
  emit("emitHandleClick");
};
</script>
