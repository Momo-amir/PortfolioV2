<template>
  <div class="container flex flex-col justify-center my-10 wrap items-center">
    <text-title tagType="h1" title="PORTFOLIO" class="text-6xl font-bold" />
    <text-manchet
      class="mt-5 text-xl"
      manchet="Tag et kig på mine tidligere projekter" />
  </div>
  <div
    class="container grid grid-cols-1 md:grid-cols-12 auto-rows-min md:auto-rows-max gap-4 my-20">
    <div class="md:col-start-1 md:col-span-6 flex-grow">
      <Card
        link="https://kruso.dk/"
        title="Kruso.dk"
        description="Vedligholdelse af Kruso.dk samt udvikling af nye features i React, introduktion til opsættelse af cookies og contentful"
        image="https://i.imgur.com/DX1sUiZ.png"
        linkTarget="_blank" />
    </div>
    <div class="md:col-start-7 md:col-span-6 flex-grow">
      <Card
        title="Forbrug.dk"
        description="Styling og vedligholdelse af Forbrug.dk"
        image="https://i.imgur.com/m6WC7Mp.png"
        :link="`https://forbrug.dk/`"
        linkTarget="_blank" />
    </div>
    <div class="md:col-start-1 md:col-span-8 md:row-start-1 flex-grow">
      <Card
        title="Folketingets Skolevalg"
        description="Udfordrende Nuxt projekt - Klik for at se mere"
        image="https://i.imgur.com/MC4q7yw.png"
        :link="`/portfolio/skolevalg`" />
    </div>
    <div class="md:col-start-9 md:col-span-4 md:row-start-1 md:row-span-1">
      <div class="mb-5 md:mb-2 flex-grow">
        <Card
          title="KFST.dk"
          description="KFST.dk arbejdede jeg med meget med data typer brugt i Umbraco 10, samt udvikling af komponenter i vanilla JS"
          image="https://i.imgur.com/kjFpAWz.jpg"
          link="https://kfst.dk/"
          linkTarget="_blank" />
      </div>
      <div class="gap-y-4 flex-grow">
        <Card
          title="Forbrugerombudsmanden.dk"
          description="På forbrugerombudsmanden stod jeg primært for styling i SCSS samt udvikling af komponenter i vanilla JS"
          image="https://i.imgur.com/moeajjV.jpg"
          link="https://www.forbrugerombudsmanden.dk/"
          linkTarget="_blank" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrap {
  margin-top: 10rem;
}
</style>
