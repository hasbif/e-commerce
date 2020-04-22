<template>
  <div class="home">
    <Navbar />
    <img alt="Vue logo" src="../assets/logo.png" />
    Detail
    <b-card :img-src="product.image_url" img-alt="Card image" img-left class="mb-3">
      <h4>{{product.name}}</h4>
      <div v-if="product.stock<1">
        <h6>Price: {{formatPrice(product.price)}}</h6>
        <h6>Sorry, this item is currently out of stock</h6>
      </div>
      <div v-else>
        <h6>Price: {{formatPrice(product.price)}}</h6>
        <h6>Stock: {{product.stock}}</h6>
        <b-button v-b-modal.modal-1 @click="resetModal">Add to Cart</b-button>
      </div>
    </b-card>
    {{product}}
    <b-modal id="modal-1" :title="product.name" okTitle="Add" @ok="addToCart">
      <label>Quantity</label>
      <b-form-spinbutton v-model="amount" min="1" :max="product.stock"></b-form-spinbutton>
    </b-modal>
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