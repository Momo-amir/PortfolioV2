<template>
  <div class="container flex flex-col justify-center my-10 wrap items-center">
    <PageHeader
      :title="aboutHeaderData.pageHeader?.title"
      :manchet="aboutHeaderData.pageHeader?.manchet?.text" />
  </div>
  <div>
    <hero-text
      :img="aboutData?.longText?.img?.url"
      :title="aboutData?.longText?.title"
      :content="aboutData?.longText?.content?.text" />
  </div>
</template>
<script setup lang="ts">
const aboutData = await GqlLongText({ id: "clopk3cwejysf0bur6dt3vw3y" });
const aboutHeaderData = await GqlPageHeader({
  id: "cloplgk43k6890bulpq9idl2t",
});
//
</script>
<style scoped>
.wrap {
  margin-top: 10rem;
}
</style>
