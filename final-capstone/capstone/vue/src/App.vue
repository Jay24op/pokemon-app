<template>
  <div id="pokemon-app">
    <section id="header">
      <section id="nav">
        <div class="links">
          <!--v-if="$store.state.token != ''" -->
          <router-link v-bind:to="{ name: 'home' }">View All</router-link>
          <img src="./assets/pokeball-icon.png" alt="pokeball image" />
          <router-link v-bind:to="{ name: 'logout' }">Logout</router-link>
        </div>
      </section>
      <section id="logo">
        <img src="./assets/pokemon-logo.png" alt="" />
      </section>
    </section>
    <section id="view">
      <router-view />
    </section>
  </div>
</template>

<style scoped>
#pokemon-app {
}

#header {
  height: 25rem;
  background: var(--pokeball-gradient);
  background-repeat: no-repeat;
  padding-top: 2rem;
}

#nav {
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
  width: 35rem;
  min-width: fit-content;
  margin: 0 1rem 0 auto;
  border: 0.4rem solid var(--yellow);
  border-radius: 1.75rem;
  background-color: var(--nav-interior);
}

.links {
  display: flex;
  align-items: center;
  height: 3rem;
}

.links > a {
  color: var(--blue);
  transition: font-size 0.2s linear;
}

.links > a:hover,
.links > .router-link-exact-active {
  color: var(--turquoise);
}

.links > a:hover {
  font-size: 1.7rem;
}

.links > img {
  max-height: 100%;
  margin: 0 1.2rem 0 1rem;
}

#logo {
  height: 15rem;
  width: 100%;
  max-height: 25rem;
  margin: 0 auto;
  text-align: center;
}

#logo > img {
  height: 100%;
  max-width: 100%;
}

#view {
  padding: 0.5rem 2rem 1.5rem;
}
</style>
