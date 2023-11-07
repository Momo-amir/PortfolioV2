<template>
  <div class="manchet" v-html="props.manchet"></div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  manchet: string;
}>();
</script>
