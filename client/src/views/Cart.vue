<template>
  <div>
    <Navbar />
    My Cart
    {{cart}}
    <b-alert
      show
      variant="info"
      v-if="cart.length<1"
    >It seems like you have nothing in your cart right now</b-alert>
    <div class="cart" v-else>
      <div class="itemcart">
        <div class="leftcart">Checkout</div>
        <div class="rightcart">Balance</div>
      </div>

      <div class="itemcart" v-for="item in cart" :key="item.Product.id">
        <div class="leftcart">
          <b-card
            :img-src="item.Product.image_url"
            img-left
            img-width="20%"
            img-height="250vh"
            :title="item.Product.name"
            :sub-title="String(item.Product.price)"
            align="left"
            height="100%"
          >
            <h6>Quantity:{{item.amount}}</h6>
            <p>Stocks left:{{item.Product.stock}}</p>

            <b-button
              v-b-modal.modaledit
              @click="setModal(item.amount,item.id,item.Product.stock,item.Product.name)"
            >Edit</b-button>
            <b-button
              v-b-modal.modaldel
              @click="setModal(item.amount,item.id,item.Product.stock,item.Product.name)"
            >Delete</b-button>
          </b-card>
        </div>
        <div class="rightcart">
          <h4>{{item.amount*item.Product.price}}</h4>
          <h6>{{item.Product.price}} X {{item.amount}}</h6>
        </div>
      </div>
      <div class="itemcart">
        <div class="leftcart">
          <button @click="checkout">Checkout</button>
        </div>
        <div class="rightcart">{{total}}</div>
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
  created() {
    this.$store.dispatch("getCart");
  },
  methods: {
    setModal(num, id, stock, name) {
      this.amount = num;
      this.cartId = id;
      this.stock = stock;
      this.name = name;
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
                this.$router.push("/");
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
  border-style: solid;
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
</style>