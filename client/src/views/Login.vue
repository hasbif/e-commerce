<template>
  <div>
    <Navbar />

    <div class="full center-xy-container">
      <div class="center" style="min-width: 20em">
        <h2>LOGIN</h2>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              v-model="email"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              v-model="password"
            />
          </div>
          <button class="btn btn-primary" type="submit">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";
const url = "https://ecom-cust.herokuapp.com/";
export default {
  name: "Login",
  components: { Navbar },
  data: function() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    login(e) {
      e.preventDefault();
      console.log(this.email, this.password);
      axios({
        method: "post",
        url: url + "login",
        data: { email: this.email, password: this.password }
      })
        .then(res => {
          console.log("login", res);
          localStorage.setItem("access_token", res.data.access_token);
          this.$store.dispatch("getCart");
          this.$router.push("/");
          this.$store.dispatch("toast", {
            vm: this,
            title: "Logged In Successfuly",
            message: "Welcome"
          });
        })
        .catch(err => {
          console.log("error", err.response);
          this.$store.dispatch("toast", {
            vm: this,
            title: "Login Failed",
            message: err.response.data.msg
          });
        });

      this.email = null;
      this.password = null;
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