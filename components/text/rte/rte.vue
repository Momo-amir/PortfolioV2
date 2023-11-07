<template>
  <div class="rte" v-html="props.content"></div>
</template>
<script setup lang="ts">
const props = defineProps<{
  content: string;
}>();
</script>
