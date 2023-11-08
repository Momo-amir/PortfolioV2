<template>
  <div class="map-container" role="application" aria-label="Choropleth Map">
    <div
      id="map"
      style="height: 800px; width: 100%"
      tabindex="
      0"></div>
    <div
      class="graphcontainer"
      v-if="showChart"
      :class="{ visible: showChart }">
      <graph :selected-municipality-id="selectedMunicipalityId" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { darken } from "polished"; //used to make the color darker when hovering over a map polygon. If possible this should be removed and replaced with logic that does this without the need of a library
import geojsonData from "./geojson.json"; // This is the geojson data that is used to create the map. This should be replaced with data from the API the file is based on

type IPartyVotingData = {
  partyId: string;
  votes: number;
  regionId?: string;
  municipalityId: string;
  schoolId?: string;
};
type IPartyInfo = {
  token: string;
  partyTitle: string;
  color: string;
  colorLighter: string;
  letter: string;
};

function getColor(value: number) {
  return partyColors[value] || "#FFF";
}

const partyInfo: IPartyInfo[] = [
  {
    token: "Socialdemokratiet",
    partyTitle: "Socialdemokratiet",
    color: "#A82721",
    colorLighter: "#DB5049",
    letter: "A",
  },
  {
    token: "Alternativet",
    partyTitle: "Alternativet",
    color: "#2B8738",
    colorLighter: "#49C55A",
    letter: "Å",
  },
  {
    token: "RadikaleVenstre",
    partyTitle: "Radikale Venstre",
    color: "#733280",
    colorLighter: "#AA52BC",
    letter: "B",
  },
  {
    token: "SocialistiskFolkeparti",
    partyTitle: "Socialistisk Folkeparti",
    color: "#E07EA8",
    colorLighter: "#F2C8DA",
    letter: "F",
  },
  {
    token: "Enhedslisten",
    partyTitle: "Enhedslisten",
    color: "#E6801A",
    colorLighter: "#EFAE6D",
    letter: "Ø",
  },
  {
    token: "Konservative",
    partyTitle: "Konservative",
    color: "#96B226",
    colorLighter: "#C1DB58",
    letter: "C",
  },
  {
    token: "LiberalAlliance",
    partyTitle: "Liberal Alliance",
    color: "#3FB2BE",
    colorLighter: "#83CED6",
    letter: "I",
  },
  {
    token: "DanskFolkeparti",
    partyTitle: "Dansk Folkeparti",
    color: "#EAC73E",
    colorLighter: "#F3DF91",
    letter: "O",
  },
  {
    token: "NyeBorgerlige",
    partyTitle: "Nye Borgerlige",
    color: "#127B7F",
    colorLighter: "#1DC9CF",
    letter: "D",
  },
  {
    token: "KristenDemokraterne",
    partyTitle: "Kristendemokraterne",
    color: "#8B8474",
    colorLighter: "#B5B0A6",
    letter: "K",
  },
  {
    token: "FrieGrønne",
    partyTitle: "Frie Grønne",
    color: "#5ABE82",
    colorLighter: "#9CD8B4",
    letter: "Q",
  },
  {
    token: "Venstre",
    partyTitle: "Venstre",
    color: "#254264",
    colorLighter: "#3E6EA7",
    letter: "V",
  },
  {
    token: "DanmarksDemokraterne",
    partyTitle: "Danmarks Demokraterne",
    color: "#7896D2",
    colorLighter: "#BDCCE9",
    letter: "Æ",
  },
  {
    token: "Moderaterne",
    partyTitle: "Moderaterne",
    color: "#B48CD2",
    colorLighter: "#DFCEEC",
    letter: "M",
  },
];

const data = ref([
  {
    partyId: "Socialdemokratiet",
    votes: 26,
    municipalityId: "751",
    schoolId: "1234",
  },
  {
    partyId: "Socialdemokratiet",
    votes: 36,
    municipalityId: "101",
  },
  {
    partyId: "Alternativet",
    votes: 4,
    municipalityId: "101",
    regionId: "1",
  },
  {
    partyId: "Alternativet",
    votes: 40,
    municipalityId: "751",
    schoolId: "5678",
  },
  {
    partyId: "RadikaleVenstre",
    votes: 3,
    municipalityId: "101",
  },
  {
    partyId: "RadikaleVenstre",
    votes: 4,
    municipalityId: "751",
    schoolId: "9101",
  },
  {
    partyId: "SocialistiskFolkeparti",
    votes: 10,
    municipalityId: "370",
  },
  {
    partyId: "SocialistiskFolkeparti",
    votes: 5,
    municipalityId: "101",
  },
  {
    partyId: "Enhedslisten",
    votes: 8,
    municipalityId: "751",
    schoolId: "1234",
  },
  {
    partyId: "Konservative",
    votes: 31,
    municipalityId: "101",
  },
  {
    partyId: "LiberalAlliance",
    votes: 8,
    municipalityId: "751",
    schoolId: "5678",
  },
  {
    partyId: "LiberalAlliance",
    votes: 4,
    municipalityId: "430",
  },
  {
    partyId: "DanskFolkeparti",
    votes: 1,
    municipalityId: "760",
  },
  {
    partyId: "FrieGrønne",
    votes: 14,
    municipalityId: "101",
  },
  {
    partyId: "Moderaterne",
    votes: 10,
    municipalityId: "751",
    schoolId: "9101",
  },
  {
    partyId: "Enhedslisten",
    votes: 4,
    municipalityId: "101",
  },
  {
    partyId: "DanmarksDemokraterne",
    votes: 3,
    municipalityId: "751",
  },
  {
    partyId: "DanmarksDemokraterne",
    votes: 3,
    municipalityId: "101",
  },
  {
    partyId: "Venstre",
    votes: 30,
    municipalityId: "751",
  },
  {
    partyId: "Venstre",
    votes: 10,
    municipalityId: "101",
  },
  {
    partyId: "KristenDemokraterne",
    votes: 0,
    municipalityId: "751",
  },
  {
    partyId: "KristenDemokraterne",
    votes: 0,
    municipalityId: "101",
  },
  {
    partyId: "NyeBorgerlige",
    votes: 0,
    municipalityId: "101",
  },
  {
    partyId: "NyeBorgerlige",
    votes: 0,
    municipalityId: "101",
  },
  {
    partyId: "Moderaterne",
    votes: 17,
    municipalityId: "791",
  },
  {
    partyId: "Moderaterne",
    votes: 6,
    municipalityId: "657",
  },
]);
// Leaflet types need to be properly imported into the project to not get typescript errors.
//The errors will be on the L values and layer values
const titleKey = "KOMNAVN";
const idKey = "KOMKODE";
const L: Ref<Leaflet | null> = ref(null);
const map: Ref<Leaflet.Map | null> = ref(null);
const showChart = ref(false);
const selectedMunicipalityId = ref<string | null>(null);

/**
 * Calculates the votes for each party in each municipality and assigns a color to the municipality based on the party with the most votes.
 * Data - An array of objects containing the voting data for each party in each municipality.
 * PartyInfo - An array of objects containing information about each party, including their token and color.
 * Returns An object containing the party votes for each municipality and the corresponding color for each municipality.
 */
const partyVotes: { [key: string]: { [key: string]: number } } = {};
data.value.forEach((item: IPartyVotingData) => {
  const municipalityId = item.municipalityId;
  if (!partyVotes[municipalityId]) {
    partyVotes[municipalityId] = {};
  }
  if (!partyVotes[municipalityId][item.partyId]) {
    partyVotes[municipalityId][item.partyId] = 0;
  }
  partyVotes[municipalityId][item.partyId] += item.votes;
});

const partyColors: { [key: string]: string } = {};
Object.keys(partyVotes).forEach((municipalityId: string) => {
  const parties = partyVotes[municipalityId];
  const maxVotes = Math.max(...Object.values(parties));
  const maxParty = Object.keys(parties).find(
    (partyId) => parties[partyId] === maxVotes
  );
  if (maxParty) {
    const party = partyInfo.find((party) => party.token === maxParty);
    if (party) {
      partyColors[municipalityId] = party.color;
    }
  }
});

// This function is called when the component is mounted. It imports the Leaflet library and sets up the map with the geojson data.
onMounted(async () => {
  if (process.client) {
    L.value = (await import("leaflet")).default;
    import("leaflet/dist/leaflet.css");

    try {
      const data = geojsonData;
      map.value = createMap();

      // This creates a geojson layer with the data and sets the style and behavior of each feature.
      const geojsonLayer = L.value.geoJSON(data, {
        style: function (feature: L.geoJSON.Feature) {
          return {
            fillColor: getColor(feature.properties[idKey]),
            weight: 1,
            opacity: 1,
            color: "black",
            fillOpacity: 1,
          };
        },
        onEachFeature: function (feature: L.geoJSON.Feature, layer: L.Layer) {
          // This sets up the behavior of each feature when it is added to the map.
          layer.on("add", function () {
            setTimeout(() => {
              if (layer._path) {
                const pathElement = layer._path as SVGElement;
                (layer._path as SVGElement).setAttribute("tabindex", "0");
                pathElement.setAttribute("role", "button");

                pathElement.addEventListener("keydown", handleRegionKeyDown);
              }
            }, 0);
          });

          // This function handles the behavior of a feature when a key is pressed.
          function handleRegionKeyDown(e: KeyboardEvent) {
            if (e.key === "Enter") {
              layer.fire("click");
            }
          }

          // This sets up the behavior of each feature when it is clicked.
          layer.on("click", function () {
            layer.setStyle({
              fillColor: darken(0.2, getColor(feature.properties[idKey])),
            });

            const municipalityId = feature.properties[idKey];
            const parties = partyVotes[municipalityId];
            const maxVotes = parties ? Math.max(...Object.values(parties)) : 0;
            parties
              ? Object.keys(parties).find(
                  (party) => parties[party] === maxVotes
                )
              : undefined;
            selectedMunicipalityId.value = feature.properties[idKey];
            showChart.value = true;
          });

          // This sets up the behavior of each feature when the mouse is over it.
          // Creates a div with the title of the feature and sets the color of the feature to a darker color.
          const labelDiv = document.createElement("div");
          labelDiv.classList.add("label-div");
          labelDiv.innerText = feature.properties[titleKey];

          layer.on("mouseover", function () {
            layer.setStyle({
              fillColor: darken(0.2, getColor(feature.properties[idKey])),
            });
            const municipalityId = feature.properties[idKey];
            const parties = partyVotes[municipalityId];
            const maxVotes = parties ? Math.max(...Object.values(parties)) : 0;
            const maxPartyId = parties
              ? Object.keys(parties).find(
                  (partyId) => parties[partyId] === maxVotes
                )
              : undefined;

            let partypartyTitle;
            if (maxPartyId) {
              const party = partyInfo.find(
                (party) => party.token === maxPartyId
              );
              if (party) {
                partypartyTitle = party.partyTitle;
              }
            }

            const popupContent = `
              <div class="party-title" >
                    <strong>${feature.properties[titleKey]}</strong>
                    <br>
                    ${partypartyTitle}
                    <div class="party-color" style="background-color:${getColor(
                      feature.properties[idKey]
                    )}; "></div>
                  </div>
                `;
            if (partypartyTitle !== undefined) {
              layer.bindPopup(popupContent).openPopup();
            }
            layer.on("mousemove", function (e: L.LeafletMouseEvent) {
              layer.getPopup().setLatLng(e.latlng);
            });
          });

          // This sets up the behavior of each feature when the mouse is out of it.
          // Closes the popup and sets the color of the feature to the original color.
          layer.on("mouseout", function () {
            layer.closePopup();
            layer.setStyle({
              fillColor: getColor(feature.properties[idKey]),
            });
          });

          // This binds the title of each feature to its popup.
          if (feature.properties && feature.properties[titleKey]) {
            layer.bindPopup(feature.properties[titleKey]);
          }
        },
      });

      geojsonLayer.addTo(map.value);
    } catch (error) {
      console.error(error);
    }
  }
});

function createMap() {
  // Define screen width breakpoints
  const smallScreen = 480;
  const mediumScreen = 768;

  // Define zoom levels for different screen sizes
  const zoomSmall = 6.2;
  const zoomMedium = 7.0;
  const zoomLarge = 7.2;

  // Define views for different screen sizes
  const viewSmall = [56.1, 11.6];
  const viewMedium = [56.2, 11.7];
  const viewLarge = [56.3, 11.8];

  // Get the current screen size
  const screenWidth = window.innerWidth;

  // Determine the zoom level and view based on the screen size
  let zoom =
    screenWidth <= smallScreen
      ? zoomSmall
      : screenWidth <= mediumScreen
      ? zoomMedium
      : zoomLarge;
  let view =
    screenWidth <= smallScreen
      ? viewSmall
      : screenWidth <= mediumScreen
      ? viewMedium
      : viewLarge;

  const mapInstance = L.value
    .map("map", {
      scrollWheelZoom: false,
      keyboard: true,
      zoomControl: true,
      zoom: 0,
      zoomAnimation: true,
      fadeAnimation: false,
      markerZoomAnimation: true,
      zoomSnap: 0.1,
    })
    .setView(view, zoom);

  let currentBounds = mapInstance.getBounds();

  // Store the initial zoom level
  const initialZoom = zoom;

  // Set the max bounds
  mapInstance.setMaxBounds(currentBounds);

  // Set the minimum zoom level for the initial zoom
  mapInstance.setMinZoom(initialZoom);

  const disablePanWhenMinZoom = function () {
    if (mapInstance.getZoom() === initialZoom) {
      mapInstance.dragging.disable();
    } else {
      mapInstance.dragging.enable();
    }
  };
  mapInstance.on("zoomend", disablePanWhenMinZoom);

  // Check zoom level on initial map load
  disablePanWhenMinZoom();

  const resizeMap = function () {
    const newScreenWidth = window.innerWidth;

    // Determine the zoom level and view based on the new screen size
    let newZoom =
      newScreenWidth <= smallScreen
        ? zoomSmall
        : newScreenWidth <= mediumScreen
        ? zoomMedium
        : zoomLarge;
    let newView =
      newScreenWidth <= smallScreen
        ? viewSmall
        : newScreenWidth <= mediumScreen
        ? viewMedium
        : viewLarge;

    // Update the map view and zoom level
    mapInstance.setView(newView, newZoom);
    mapInstance.setMinZoom(newZoom);

    // Update the current bounds
    const newBounds = mapInstance.getBounds();
    mapInstance.setMaxBounds(newBounds);
    currentBounds = newBounds;

    // Disable panning when the map is at the minimum zoom level
    disablePanWhenMinZoom();
  };

  // Call the resizeMap function when the screen size changes
  const mediaQuerySmall = window.matchMedia(`(max-width: ${smallScreen}px)`);
  const mediaQueryMedium = window.matchMedia(`(max-width: ${mediumScreen}px)`);

  const handleScreenSizeChange = function () {
    if (mediaQuerySmall.matches) {
      resizeMap();
    } else if (mediaQueryMedium.matches) {
      resizeMap();
    }
  };

  mediaQuerySmall.addListener(handleScreenSizeChange);
  mediaQueryMedium.addListener(handleScreenSizeChange);

  return mapInstance;
}
</script>

<style lang="scss">
#map {
  height: 80rem;
  width: 100%;
  // transition: width 0.5s ease-in-out;  Only animate width
}

.graphcontainer {
  position: absolute;
  width: 0; // hide by default
  overflow: hidden;
  transition: width 0.5s ease-in-out;
  right: 0;

  &.visible {
    width: 35%; // show and take up 30% of the width when visible
    z-index: 999;
  }
}

.party-color {
  position: relative;
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}

.party-title {
  position: relative;
  font-size: 1.2rem;
}
.leaflet-container {
  background: transparent !important;
}

.leaflet-popup-content-wrapper {
  background: black;
  border-radius: 0;
  color: white;
  box-shadow: none;
}
.leaflet-popup-tip {
  background: black;
}
.leaflet-popup-close-button {
  display: none;
}
.map-container {
  display: flex;
  flex-direction: row;
  position: relative;
}
.graphcontainer {
  overflow: hidden;
  transition: ease-in-out 0.5s;
  .graph {
    &__name {
      @media (max-width: 768px) {
        display: none;
      }
    }
  }
}

.leaflet-interactive:focus {
  outline: 3px solid black;
}
</style>
