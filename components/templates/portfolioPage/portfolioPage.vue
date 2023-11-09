<template>
  <div class="container flex flex-col justify-center my-10 wrap items-center">
    <page-header
      :title="portfolioHeaderData.pageHeader?.title"
      :manchet="portfolioHeaderData.pageHeader?.manchet?.text" />
  </div>
  <div
    class="container grid grid-cols-1 md:grid-cols-12 auto-rows-min md:auto-rows-max gap-4 my-20">
    <div class="md:col-start-1 md:col-span-6 flex-grow">
      <Card
        :link="krusoData?.card?.link"
        :title="krusoData?.card?.title"
        :description="krusoData?.card?.description"
        :image="krusoData?.card?.image?.url"
        :imageAlt="krusoData?.card?.imageAlt"
        :linkTarget="krusoData?.card?.linkTarget" />
    </div>
    <div class="md:col-start-7 md:col-span-6 flex-grow">
      <Card
        :link="forbrugData?.card?.link"
        :title="forbrugData?.card?.title"
        :description="forbrugData?.card?.description"
        :image="forbrugData?.card?.image?.url"
        :imageAlt="forbrugData?.card?.imageAlt"
        :linkTarget="forbrugData?.card?.linkTarget" />
    </div>
    <div class="md:col-start-1 md:col-span-8 md:row-start-1 flex-grow">
      <Card
        :link="skolevalgData?.card?.link"
        :title="skolevalgData?.card?.title"
        :description="skolevalgData?.card?.description"
        :image="skolevalgData?.card?.image?.url"
        :imageAlt="skolevalgData?.card?.imageAlt"
        :linkTarget="skolevalgData?.card?.linkTarget" />
    </div>
    <div class="md:col-start-9 md:col-span-4 md:row-start-1 md:row-span-1">
      <div class="mb-5 md:mb-2 flex-grow">
        <Card
          :link="kfstData?.card?.link"
          :title="kfstData?.card?.title"
          :description="kfstData?.card?.description"
          :image="kfstData?.card?.image?.url"
          :imageAlt="kfstData?.card?.imageAlt"
          :linkTarget="kfstData?.card?.linkTarget" />
      </div>
      <div class="gap-y-4 flex-grow">
        <Card
          :link="ombudData?.card?.link"
          :title="ombudData?.card?.title"
          :description="ombudData?.card?.description"
          :image="ombudData?.card?.image?.url"
          :imageAlt="ombudData?.card?.imageAlt"
          :linkTarget="ombudData?.card?.linkTarget" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const krusoData = await GqlCard({ id: "clopgn7qkj0820bulq1fh4gw5" });
const forbrugData = await GqlCard({ id: "clopgpaoa49mg0bup0ozrh16j" });
const kfstData = await GqlCard({ id: "clopgv0r1iu160bur9oxxyr3r" });
const skolevalgData = await GqlCard({ id: "clopgrxktj4ex0burazpk3if5" });
const ombudData = await GqlCard({ id: "clopgxmf3476o0buhr1w4so3f" });
const portfolioHeaderData = await GqlPageHeader({
  id: "cloplmvnvk79u0bulc75ng0uo",
});
</script>

<style scoped lang="scss">
.wrap {
  margin-top: 10rem;
}
</style>
