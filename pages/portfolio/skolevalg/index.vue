<template>
  <div class="grid xl:grid-cols-12 grid-cols-1 my-20">
    <div class="xl:col-span-6 col-span-1">
      <HeroText
        content="
    Under Skolevalg-projektet havde jeg muligheden for at deltage i alle faser af projektet, fra start til slut. Min primære rolle var at udvikle forskellige komponenter til frontend-applikationen ved hjælp af Nuxt.js. Projektet var struktureret efter atomic design-principperne for at maksimere genbrugeligheden af komponenterne. <br/> <br/>

Et af de mest markante komponenter, jeg arbejdede på, var en interaktiv kortapplikation. Planen for hvordan data skulle behandles til valgresultatet var ikke blevet fastlagt inden projektet, det var min opgave at finde en sjov og interaktiv måde at håndtere valgresultatssiden på. Jeg undersøgte forskellige teknologier der kunne bruges og endte med at vælge leaflet til at lave et interaktivt kort. <br/> <br/> Denne applikation visualiserer valgdata på et geografisk kort, der er baseret på GeoJSON-data. GeoJSON er et almindeligt anvendt format til kodning af forskellige typer geografiske datastrukturer. <br/> <br/>

Kortapplikationen er designet til at vise, hvordan forskellige partier har præsteret i forskellige kommuner. Hver kommune er farvet i henhold til det parti, der har fået flest stemmer i den pågældende kommune. Farverne for hvert parti er defineret i et separat datasæt. <br/> <br/>

Interaktion med kortet er intuitivt og tilgængeligt. Når brugeren fører musen over en kommune på kortet, bliver kommunen mørkere for at indikere interaktion, og en popup vises med information om kommunen og det parti, der har fået flest stemmer. Hvis brugeren klikker på en kommune, vises en graf, der repræsenterer stemmefordelingen i den valgte kommune. Hver region på kortet kan fokuseres ved hjælp af tastaturet, og når den er fokuseret, kan brugeren interagere med den ved hjælp af Enter-tasten. <br/> <br/>

Kortet er responsivt og tilpasser sig forskellige skærmstørrelser. Zoomniveauet og visningen af kortet justeres automatisk baseret på skærmstørrelsen for at sikre, at kortet altid er let at interagere med. <br/> <br/>

Teknologisk set blev projektet bygget med en stack, der inkluderede Nuxt3 med TypeScript, SCSS for stilark, Docker for containerisering, et Kubernetes cluster for orkestrering og Umbraco som CMS. Denne kombination af teknologier sikrede en robust, skalerbar og vedligeholdelig løsning. <br/> <br/>

Dette komponent er et kraftfuldt værktøj til visualisering af valgdata, der gør det muligt for brugere at udforske dataene på en intuitiv og interaktiv måde. Jeg har inkluderet et hardcoded eksempel med falsk data i dette portfolio, da det ikke er muligt at få adgang til den faktiske data."
        radius="rounded-xl"
        title="Folketingets Skolevalg" />
    </div>

    <div class="my-20 xl:col-span-5 xl:col-start-7 col-span-1">
      <ChoroplethMap />
    </div>
  </div>
</template>
