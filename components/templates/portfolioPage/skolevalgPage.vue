<template>
  <div class="grid xl:grid-cols-12 grid-cols-1 my-20">
    <div class="xl:col-span-6 col-span-1">
      <HeroText
        :content="skolevalgData?.longText?.content?.text"
        :title="skolevalgData.longText?.title" />
    </div>

    <div class="my-20 xl:col-span-5 xl:col-start-7 col-span-1">
      <ChoroplethMap />
    </div>
  </div>
</template>

<script setup lang="ts">
const skolevalgData = await GqlLongText({ id: "clopi5b8ejb660bulpsqz53dc" });
</script>
