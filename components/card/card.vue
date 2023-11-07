<template>
  <Transition name="fade">
    <NuxtLink :to="props.link" :target="props.linkTarget" v-if="mounted">
      <div class="relative rounded flex">
        <img
          :src="image"
          alt=""
          class="w-full h-full object-cover rounded-xl" />
        <div
          class="card absolute inset-0 bg-black bg-opacity-0 transition-opacity hover:bg-opacity-80 flex items-center justify-center">
          <div
            class="card-text flex flex-col justify-center p-4 opacity-0 transition-opacity text-center">
            <h2 class="text-white text-lg">{{ title }}</h2>
            <p class="text-white">{{ description }}</p>
          </div>
        </div>
      </div></NuxtLink
    ></Transition
  >
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string;
  image: string;
  link: string;
  linkTarget?: string;
}>();

let mounted = ref(false);
console.log(mounted);

onMounted(() => {
  mounted.value = true;
  console.log(mounted);
});
</script>

<style scoped lang="scss">
.card {
  transition: opacity 0.3s ease-in; // Increase the duration to 1s
  &:hover {
    .card-text {
      opacity: 1;
      transition: opacity 0.3s ease-in; // Increase the duration to 1s
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
