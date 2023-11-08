<template>
  :

  <div class="hero min-h-screen bg-base" :key="id">
    <Transition name="fade">
      <div v-if="mounted" class="hero-content flex-col lg:flex-row-reverse">
        <img
          v-if="props.img"
          :src="props.img"
          class="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 v-if="props.title" class="text-8xl font-bold">
            {{ props.title }}
          </h1>
          <h2 v-if="props.manchet" class="py-6 text-5xl">
            {{ props.manchet }}
          </h2>
          <text-rte
            v-if="props.content"
            class="py-5 text text-xl"
            :content="content"></text-rte>
          <NuxtLink
            v-if="linkText"
            to="/portfolio"
            class="btn btn-lg rounded-xl btn-outline"
            >{{ props.linkText }}</NuxtLink
          >
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
  manchet: string;
  content: string;
  linkText?: string;
  id?: string;
  img?: string;
}>();

let mounted = ref(false);
console.log(mounted);

onMounted(() => {
  setTimeout(() => {
    mounted.value = true;
    console.log(mounted);
  }, 100);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-in;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
