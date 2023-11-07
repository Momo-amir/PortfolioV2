<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </label>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52">
          <li><NuxtLink to="/cases">Portfolio</NuxtLink></li>
          <li><NuxtLink to="/about">Om mig</NuxtLink></li>

          <li><NuxtLink to="/contact">Kontakt</NuxtLink></li>
        </ul>
      </div>
      <NuxtLink to="/" class="btn btn-ghost normal-case text-xl">MOMO</NuxtLink>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1 mx-1">
        <li><NuxtLink to="/portfolio">Portfolio</NuxtLink></li>
        <li><NuxtLink to="/about">Om mig</NuxtLink></li>

        <li><NuxtLink to="/contact">Kontakt</NuxtLink></li>
      </ul>
    </div>
    <div class="navbar-end">
      <LightDark class="mx-1" />
    </div>
  </div>
</template>
