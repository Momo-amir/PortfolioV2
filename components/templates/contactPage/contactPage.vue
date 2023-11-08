<template>
  <div
    class="container flex flex-col justify-center my-10 wrap items-center text-center">
    <page-header
      :title="contactData.pageHeader?.title"
      :manchet="contactData.pageHeader?.manchet?.text"
      :content="contactData.pageHeader?.content?.text" />
  </div>
</template>

<script setup lang="ts">
const contactData = await GqlPageHeader({ id: "clopl1wjyjxg30bw6l6wouqkp" });
</script>

<style scoped>
.wrap {
  margin-top: 10rem;
  margin-bottom: 40rem;
}
</style>
