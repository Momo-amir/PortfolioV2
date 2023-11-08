<template>
  <div>
    <text-title tagType="h1" :title="props.title" class="text-6xl font-bold" />
    <text-manchet class="mt-5 text-xl" :manchet="props.manchet" />
    <text-rte
      v-if="props.content"
      :content="props.content"
      class="text-xl text-center content"></text-rte>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  manchet: string;
  content?: string;
}>();
</script>
