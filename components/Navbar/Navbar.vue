<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <NuxtLink
        to="/"
        class="btn btn-ghost normal-case text-xl font-bold md:ml-7"
        >MOMO</NuxtLink
      >
    </div>
    <div class="navbar-center hidden lg:flex"></div>
    <div class="navbar-end md:mr-10">
      <ul class="menu menu-horizontal px-1 mx-1 hidden lg:flex font-semibold">
        <li><NuxtLink to="/portfolio">Portfolio</NuxtLink></li>
        <li><NuxtLink to="/about">Om mig</NuxtLink></li>

        <li><NuxtLink to="/contact">Kontakt</NuxtLink></li>
      </ul>
      <LightDark class="mx-1" />
      <div class="dropdown" :class="{ open: isDropdownOpen }">
        <label
          tabindex="0"
          class="btn btn-ghost lg:hidden"
          @click="isDropdownOpen = !isDropdownOpen">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-5 h-5 stroke-current">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>

        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box right-2"
          v-show="isDropdownOpen">
          <li><NuxtLink to="/portfolio">Portfolio</NuxtLink></li>
          <li><NuxtLink to="/about">Om mig</NuxtLink></li>

          <li><NuxtLink to="/contact">Kontakt</NuxtLink></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isDropdownOpen = ref(false);
</script>
