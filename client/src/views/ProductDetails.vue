<template>
  <div class="home">
    <Navbar />

    <div class="full center-xy-container">
      <div class="center" style="width: 80vw;height: 60vh;border-style:solid;">
        <b-card :img-src="product.image_url" img-left>
          <div class="center-xy-container" style="width:100%;height:100%;">
            <div class="center">
              <h1>{{product.name}}</h1>
              <br />
              <br />
              <div v-if="product.stock<1">
                <h3>Price: {{formatPrice(product.price)}}</h3>
                <h5>Sorry, this item is currently out of stock</h5>
              </div>
              <div v-else>
                <h3>Price: {{formatPrice(product.price)}}</h3>
                <h5>Stock: {{product.stock}}</h5>
                <b-button v-b-modal.modal-1 @click="resetModal" variant="primary">Add to Cart</b-button>
              </div>
            </div>
          </div>
        </b-card>
        <b-modal id="modal-1" :title="product.name" okTitle="Add" @ok="addToCart">
          <label>Quantity</label>
          <b-form-spinbutton v-model="amount" min="1" :max="product.stock"></b-form-spinbutton>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import Navbar from "@/components/Navbar.vue";
import axios from "axios";
const url = "http://localhost:3000/";
export default {
  name: "ProductDetails",
  data: function() {
    return {
      amount: 1
    };
  },
  components: {
    Navbar
  },
  computed: {
    allproduct() {
      return this.$store.state.allproduct;
    },
    itemId() {
      return this.$route.params.id;
    },
    product: function() {
      console.log(this.itemId, "idd");
      let item = this.allproduct.find(x => x.id == this.itemId);
      console.log(this.allproduct);
      console.log("itemsd", item);
      if (item) {
        return {
          name: item.name,
          image_url: item.image_url,
          price: item.price,
          stock: item.stock,
          id: item.id
        };
      }
      return {};
    }
  },
  methods: {
    formatPrice(num) {
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      });
      return formatter.format(Number(num));
    },
    resetModal() {
      this.amount = 1;
    },
    addToCart() {
      console.log("added", this.amount, this.product.id);
      axios({
        method: "post",
        url: url + "cart",
        data: { ProductId: this.product.id, amount: this.amount },
        headers: { access_token: localStorage.access_token }
      })
        .then(res => {
          console.log(res);
          this.$store.dispatch("getCart");
          this.$store.dispatch("toast", {
            vm: this,
            title: "Added To Cart",
            message: this.product.name
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.center-xy-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: 1fr auto 1fr;
  grid-template-areas:
    ". . ."
    ". center ."
    ". . .";
}
.center-xy-container .center {
  grid-area: center;
}

.full {
  width: 100%;
  height: 90vh;
}
</style>