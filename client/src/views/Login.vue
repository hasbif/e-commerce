<template>
  <div>
    <Navbar />
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
        <small
          id="emailHelp"
          class="form-text text-muted"
        >We'll never share your email with anyone else.</small>
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
      <button class="btn btn-primary" type="submit">Submit</button>
    </form>
    {{email}} {{password}}
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";
const url = "http://localhost:3000/";
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
          this.$router.push("/");
          this.$store.dispatch("toast", {
            vm: this,
            title: "Logged In Successfuly",
            message: "Welcome"
          });
        })
        .catch(err => {
          console.log("error", err);
        });

      this.email = null;
      this.password = null;
    }
  }
};
</script>