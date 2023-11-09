<template>
  <div class="w-full border-t border-black">
    <div
      v-for="(item, index) in sortedData"
      :key="index"
      class="flex items-center justify-between graph__row relative animate-foldOut border-b border-black focus:outline-black"
      role="img"
      :aria-label="`${item.partyId} - ${item.votes} votes`"
      tabindex="0">
      <div
        class="font-bold flex justify-center items-center w-12 h-12"
        :style="{ backgroundColor: getPartyInfo(item.partyId).color }">
        <span class="text-white">{{ getPartyInfo(item.partyId).letter }}</span>
      </div>
      <div class="relative flex-grow h-12">
        <div
          class="absolute top-0 bottom-0 left-0 right-0 bg-white graph__bar-bg"></div>
        <div
          class="absolute left-0 flex items-center text-black pl-2 h-full transition-transform transform"
          :style="{
            width: calculateBarWidth(item.votes, maxVotes),
            backgroundColor: getPartyInfo(item.partyId).colorLighter,
          }"
          :aria-valuemin="0"
          :aria-valuemax="totalVotes"
          :aria-valuenow="item.votes"
          :aria-labelledby="`label-${index}`"
          :aria-describedby="`votes-${index}`">
          <span
            class="whitespace-nowrap hidden md:inline"
            :id="`label-${index}`">
            {{ getPartyInfo(item.partyId).partyTitle }}
          </span>
        </div>
      </div>
      <div class="absolute right-0 mr-4">
        {{ calculatePercentage(item.votes, totalVotes) }}%
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Props
const props = defineProps<{
  partyInfo?: IPartyInfo;
  data?: IPartyVotingData;
  selectedMunicipalityId: string | null;
  selectedSchoolId?: string | null;
  selectedRegionId?: string | null;
}>();
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
// Refs
const isPageLoaded = ref(false);
const graphRef = ref<HTMLElement | null>(null);
const selectedMunicipalityId = ref(props.selectedMunicipalityId);
const selectedRegionId = ref(props.selectedRegionId);
const selectedSchoolId = ref(props.selectedSchoolId);

// Computed property

// Filter the data based on the selected region, municipality and school (if selected)
const filteredData = computed(() => {
  let result = data.value;

  if (selectedRegionId.value) {
    result = filterByRegion(
      result,
      selectedRegionId.value,
      selectedMunicipalityId.value
    );
  }

  if (selectedMunicipalityId.value) {
    result = filterByMunicipality(result, selectedMunicipalityId.value);
  }

  if (selectedSchoolId.value) {
    result = filterBySchool(result, selectedSchoolId.value);
  }

  if (
    !selectedRegionId.value &&
    !selectedMunicipalityId.value &&
    !selectedSchoolId.value
  ) {
    result = filterByParty(result);
  }

  return result;
});

// Get the total number of votes for the selected region, municipality and school (if selected) makes sure there are no repeats
const totalVotes = computed(() => {
  return filteredData.value.reduce((total, item) => total + item.votes, 0);
});

// Sort the data by number of votes top to bottom
const sortedData = computed(() => {
  return [...filteredData.value].sort((a, b) => b.votes - a.votes);
});

// Get the maximum number of votes used to calculate the width of the bars. TotalVotes could not be used for this
const maxVotes = computed(() => {
  return filteredData.value.reduce((max, item) => Math.max(max, item.votes), 0);
});

// Methods

// Calculate the percentage of votes for each party
const calculatePercentage = (votes: number, totalVotes: number) => {
  return ((votes / totalVotes) * 100).toFixed(1);
};

// Calculate the width of the bars
const calculateBarWidth = (votes: number, maxVotes: number) => {
  return `${(votes / maxVotes) * 80}%`;
};

// Get the party info based on the partyId
const getPartyInfo = (partyId: string) => {
  const party = partyInfo.find((party) => party.token === partyId);
  return party
    ? party
    : {
        token: partyId,
        partyTitle: "Unknown",
        color: "#000000",
        colorLighter: " ",
        letter: "",
      };
};

// Helper functions
// */ Filter the data based on the selected region, municipality and school (if selected)
const filterByRegion = (
  data: IPartyVotingData[],
  selectedRegionId: string | null,
  selectedMunicipalityId: string | null
): IPartyVotingData[] => {
  let votesByRegionAndParty: { [key: string]: IPartyVotingData } = {};

  data.forEach((item) => {
    if (item.regionId === selectedRegionId) {
      // If a municipality is also selected, only include items that match both the region and the municipality
      if (
        selectedMunicipalityId &&
        item.municipalityId !== selectedMunicipalityId
      ) {
        return;
      }

      let partyAndRegionKey = `${item.regionId}-${item.partyId}`;

      if (!votesByRegionAndParty[partyAndRegionKey]) {
        votesByRegionAndParty[partyAndRegionKey] = {
          ...item,
          votes: 0,
        };
      }

      votesByRegionAndParty[partyAndRegionKey].votes += item.votes;
    }
  });

  return Object.values(votesByRegionAndParty);
};
const filterByMunicipality = (
  data: IPartyVotingData[],
  selectedMunicipalityId: string | null
): IPartyVotingData[] => {
  let votesByMunicipalityAndParty: { [key: string]: IPartyVotingData } = {};

  data.forEach((item) => {
    if (item.municipalityId === selectedMunicipalityId) {
      let partyAndMunicipalityKey = `${item.municipalityId}-${item.partyId}`;

      if (!votesByMunicipalityAndParty[partyAndMunicipalityKey]) {
        votesByMunicipalityAndParty[partyAndMunicipalityKey] = {
          ...item,
          votes: 0,
        };
      }

      votesByMunicipalityAndParty[partyAndMunicipalityKey].votes += item.votes;
    }
  });

  return Object.values(votesByMunicipalityAndParty);
};

const filterBySchool = (
  data: IPartyVotingData[],
  selectedSchoolId: string | null
): IPartyVotingData[] => {
  let votesBySchoolAndParty: { [key: string]: IPartyVotingData } = {};

  data.forEach((item) => {
    if (item.schoolId === selectedSchoolId) {
      let partyAndSchoolKey = `${item.schoolId}-${item.partyId}`;

      if (!votesBySchoolAndParty[partyAndSchoolKey]) {
        votesBySchoolAndParty[partyAndSchoolKey] = {
          ...item,
          votes: 0,
        };
      }

      votesBySchoolAndParty[partyAndSchoolKey].votes += item.votes;
    }
  });

  return Object.values(votesBySchoolAndParty);
};

const filterByParty = (data: IPartyVotingData[]): IPartyVotingData[] => {
  const votesByParty: { [key: string]: IPartyVotingData } = data.reduce(
    (acc: { [key: string]: IPartyVotingData }, item: IPartyVotingData) => {
      if (!acc[item.partyId]) {
        acc[item.partyId] = { ...item, votes: 0 };
      }
      acc[item.partyId].votes += item.votes;

      return acc;
    },
    {}
  );

  return Object.values(votesByParty);
};

// Watcher that updates the selected values when the props change
watch(
  () => [
    props.selectedMunicipalityId,
    props.selectedRegionId,
    props.selectedSchoolId,
  ],
  ([newMunicipalityId, newRegionId, newSchoolId]) => {
    selectedMunicipalityId.value = newMunicipalityId;
    selectedRegionId.value = newRegionId;
    selectedSchoolId.value = newSchoolId;
  }
);

//Lifecycle hooks
// IntersectionObserver is used to check if the graph is in view and then sets isPageLoaded to true
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isPageLoaded.value = true;
        observer.unobserve(entry.target);
      }
    });

    if (graphRef.value) {
      observer.observe(graphRef.value);
    }
  });

  if (graphRef.value) {
    observer.observe(graphRef.value);
  }
});

// DATA SHOULD BE CHANGED OUT WITH BACKEND DATA

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
</script>
<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
