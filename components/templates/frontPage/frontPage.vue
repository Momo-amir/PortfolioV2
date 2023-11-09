<template>
  <div v-if="heroData.hero">
    <Hero
      :manchet="heroData?.hero?.manchet"
      :content="heroData?.hero?.content"
      :title="heroData?.hero?.title"
      :linkText="heroData?.hero?.linkText"
      :img="heroData?.hero?.heroImage?.url" />
  </div>
</template>

<script setup lang="ts">
import { GqlHero } from "#gql";
const heroData = await GqlHero({ id: "cloopxf9k04yd0bupi09h56k2" });
</script>
