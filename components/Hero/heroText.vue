<template>
  <Transition name="fade">
    <div
      v-if="mounted"
      class="md:container br-lg grid grid-cols-1 md:grid-cols-12 auto-rows-min md:auto-rows-max gap-5 my-20">
      <img
        v-if="props.img"
        :src="props.img"
        class="rounded-xl shadow-2xl col-span-12 md:col-start-2 md:col-span-5 lg:col-span-6" />
      <div
        class="bg-accent text-neutral-content rounded-xl"
        :class="
          props.img
            ? 'col-span-12 lg:col-start-7  lg:col-span-6'
            : 'col-span-12'
        ">
        <div class="">
          <div class="m-10">
            <h1 v-if="props.title" class="text-5xl font-bold">
              {{ props.title }}
            </h1>
            <div class="flex md-flex-row my-5">
              <text-rte :content="content" />
            </div>
          </div>
        </div>
      </div></div
  ></Transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
  content: string;
  img?: string;
}>();

let mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
