<template>
  <div>
    <Navbar />
    <b-alert
      show
      variant="info"
      v-if="!cart || cart.length<1"
    >It seems like you have nothing in your cart right now</b-alert>
    <div class="cart" v-else>
      <div class="itemcart" style="border-style: solid solid none solid;">
        <div class="leftcart">
          <h1>My Cart</h1>
        </div>
        <div class="rightcart" style="border-style: none none none solid;">
          <h1>Balance</h1>
        </div>
      </div>

      <div
        class="itemcart"
        v-for="item in cart"
        :key="item.Product.id"
        style="border-style: solid;"
      >
        <div class="leftcart">
          <b-card
            :img-src="item.Product.image_url"
            img-left
            img-width="20%"
            img-height="250vh"
            :title="item.Product.name"
            :sub-title="String(formatPrice(item.Product.price))"
            align="left"
            height="100%"
          >
            <h6>Quantity:{{item.amount}}</h6>
            <p>Stocks left:{{item.Product.stock}}</p>

            <b-button
              variant="primary"
              v-b-modal.modaledit
              @click="setModal(item.amount,item.id,item.Product.stock,item.Product.name)"
            >
              <b-icon-plus-square></b-icon-plus-square>
            </b-button>
            <b-button
              variant="warning"
              v-b-modal.modaldel
              @click="setModal(item.amount,item.id,item.Product.stock,item.Product.name)"
            >
              <b-icon-trash />
            </b-button>
          </b-card>
        </div>
        <div
          class="rightcart center-xy-container"
          style="height:auto;border-style: none none none solid;"
        >
          <div class="center">
            <h3>{{formatPrice(item.amount*item.Product.price)}}</h3>
            <h6 style="text-align:right;">{{formatPrice(item.Product.price)}} X {{item.amount}}</h6>
          </div>
        </div>
      </div>
      <div class="itemcart" style="border-style: none solid solid solid;">
        <div class="leftcart">
          <b-button
            @click="checkout"
            style="width:100%;height:100%; font-size:22px;"
            variant="outline-primary"
          >Checkout</b-button>
        </div>
        <div
          class="rightcart center-xy-container"
          style="height:auto; border-style: none none none solid;"
        >
          <div class="center">
            <h2>{{formatPrice(total)}}</h2>
          </div>
        </div>
      </div>
    </div>

    <b-modal id="modaledit" :title="name" @ok="editCart">
      <label>Quantity</label>
      <b-form-spinbutton v-model="amount" min="1" :max="stock"></b-form-spinbutton>
    </b-modal>

    <b-modal
      id="modaldel"
      :title="name"
      @ok="delCart"
    >Are you sure you want to remove this item from your cart?</b-modal>
  </div>
</template>

<script>
// @ is an alias to /src

import Navbar from "@/components/Navbar.vue";
import axios from "axios";
const url = "http://localhost:3000/";

export default {
  name: "Cart",
  data: function() {
    return {
      product: {},
      amount: 0,
      cartId: null,
      stock: 0,
      name: null
    };
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    total() {
      let total = 0;
      let cart = this.cart;
      for (let i in cart) {
        total += cart[i].Product.price * cart[i].amount;
      }
      return total;
    }
  },
  components: {
    Navbar
  },
  // created() {
  //   this.$store.dispatch("getCart");
  // },
  methods: {
    setModal(num, id, stock, name) {
      this.amount = num;
      this.cartId = id;
      this.stock = stock;
      this.name = name;
    },
    formatPrice(num) {
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      });
      return formatter.format(Number(num));
    },
    editCart() {
      axios({
        method: "put",
        url: url + "cart/" + this.cartId,
        headers: { access_token: localStorage.access_token },
        data: { amount: this.amount }
      })
        .then(res => {
          console.log(res);
          this.$store.dispatch("getCart");
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    delCart() {
      console.log("delete", this.cartId);
      axios({
        method: "delete",
        url: url + "cart/" + this.cartId,
        headers: { access_token: localStorage.access_token }
      })
        .then(res => {
          console.log(res);
          this.$store.dispatch("getCart");
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    checkout() {
      this.$bvModal
        .msgBoxConfirm("Confirm Your Purchase", { centered: true })
        .then(value => {
          if (value) {
            console.log("checkout");
            axios({
              method: "put",
              url: url + "product",
              headers: { access_token: localStorage.access_token },
              data: { cart: this.cart }
            })
              .then(res => {
                return axios({
                  method: "delete",
                  url: url + "cart",
                  headers: { access_token: localStorage.access_token }
                });
              })
              .then(res => {
                console.log(res);
                this.$store.dispatch("getProduct");
                this.$router.push("/");
                this.$store.dispatch("toast", {
                  vm: this,
                  title: "Checkout Successfull",
                  message: "Thank You"
                });
              })
              .catch(err => {
                console.log(err.response);
              });
          } else {
            console.log("canceled");
          }
        });
    }
  }
};
</script>


<style scoped>
.itemcart {
  display: flex;
  margin: 0px 5vw;
  justify-content: space-between;
  background-color: white;
}

.leftcart {
  flex: 4;
  align-self: stretch;
}

.rightcart {
  flex: 1;
  align-self: stretch;
  height: fit-content;
}

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
</style>
