<template>
  <div id="capstone-app">
    <div id="nav">
      <div v-if="$store.state.token != ''">
        <router-link v-bind:to="{ name: 'home' }">View All</router-link>&nbsp;|&nbsp;
        <router-link v-bind:to="{ name: 'logout' }" >Logout</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style>



#capstone-app {
  /* min-height: 100vh;
  background-image: var(--logo);
  background-color: var(--red);
  background-repeat: no-repeat;
  background-position:center;
  background-size: contain; */
  /* background-attachment: scroll, local; */
}
</style>
