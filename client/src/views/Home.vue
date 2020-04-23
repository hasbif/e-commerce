<template>
  <div>
    <Navbar />
    <div style="padding-top:5vh">
      <div id="carddiv" style="boder-style:solid;">
        <b-card
          v-for="item in allproduct"
          :key="item.id"
          :title="item.name"
          :img-src="item.image_url"
          img-alt="Image"
          img-top
          img-height="250px"
          tag="article"
          style="max-width: 20rem;"
          class="cards"
        >
          <b-card-text>{{formatPrice(item.price)}}</b-card-text>
          <router-link :to="`/product/${item.id}`">
            <b-button variant="primary">Details</b-button>
          </router-link>
        </b-card>
      </div>
    </div>
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
  border-style: solid;
  border-width: 0.3em;
}
</style>