<template>
  <component :is="props.tagType" class="title" :class="props.class">
    {{ props.title }}
  </component>
</template>
<script lang="ts" setup>
const props = defineProps<{
  title: string | null;
  tagType: "h1" | "h2" | "h3" | "h4";
  class?: string;
}>();
</script>
