<template>
  :

  <div class="hero min-h-screen bg-base" :key="id">
    <Transition name="fade">
      <div v-if="mounted" class="hero-content flex-col lg:flex-row-reverse">
        <img
          v-if="props.img"
          :src="props.img"
          class="md:max-w-lg rounded-lg shadow-2xl contain" />
        <div>
          <h1 v-if="props.title" class="text-5xl sm:text-8xl font-bold">
            {{ props.title }}
          </h1>
          <h2 v-if="props.manchet" class="py-4 sm:py-6 text-3xl sm:text-5xl">
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

onMounted(() => {
  setTimeout(() => {
    mounted.value = true;
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
