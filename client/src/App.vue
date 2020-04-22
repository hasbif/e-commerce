<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("getProduct");
    if (localStorage.access_token) {
      this.$store.dispatch("getCart");
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Righteous&display=swap");
* {
  border-radius: 0px !important;
}
#app {
  font-family: "Righteous", cursive, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #007bff;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
