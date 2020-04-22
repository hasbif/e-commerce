<template>
  <div class="home">
    <Navbar />
    <img alt="Vue logo" src="../assets/logo.png" />
    CARTS
    {{product}}
  </div>
</template>

<script>
// @ is an alias to /src

import Navbar from "@/components/Navbar.vue";

export default {
  name: "Cart",
  data: function() {
    return {
      product: {}
    };
  },
  components: {
    Navbar
  },
  mounted() {},
  methods: {}
};
</script>