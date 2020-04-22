<template>
  <div class="home">
    <Navbar />
    <img alt="Vue logo" src="../assets/logo.png" />
    <div id="carddiv">
      <b-card
        v-for="item in allproduct"
        :key="item.id"
        :title="item.name"
        :img-src="item.image_url"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2 cards"
      >
        <b-card-text>{{formatPrice(item.price)}}</b-card-text>
        <router-link :to="`/product/${item.id}`">
          <b-button variant="primary">Details</b-button>
        </router-link>
      </b-card>
    </div>
    {{allproduct}}
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Home",
  data: function() {
    return {};
  },
  components: {
    Navbar
  },
  computed: {
    allproduct() {
      return this.$store.state.allproduct;
    }
  },
  methods: {
    formatPrice(num) {
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      });
      return formatter.format(Number(num));
    }
  }
};
</script>

<style scoped>
#carddiv {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.cards {
  margin: 1em;
}
</style>