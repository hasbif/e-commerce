<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand>
        <router-link to="/">Home</router-link>
      </b-navbar-brand>
      <b-navbar-brand>
        <router-link to="/cart">Cart</router-link>
      </b-navbar-brand>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-navbar-nav v-if="localStorage">
          <a @click="logout">
            <b-button>Logout</b-button>
          </a>
        </b-navbar-nav>

        <b-navbar-nav v-else>
          <router-link to="/login">
            <b-button>Login</b-button>
          </router-link>

          <router-link to="/register">
            <b-button>Register</b-button>
          </router-link>
        </b-navbar-nav>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data: function() {
    return {
      localStorage: null
    };
  },
  mounted() {
    this.checkAccess();
  },
  methods: {
    logout() {
      localStorage.removeItem("access_token");
      console.log("asdd", this.$route.name);
      this.checkAccess();
      if (this.$route.name == "Home") {
      } else {
        this.$router.push("/");
      }
      this.$store.dispatch("toast", {
        vm: this,
        title: "Successfully Logged Out",
        message: "See You Soon"
      });
    },
    checkAccess() {
      if (localStorage.access_token) {
        this.localStorage = true;
      } else {
        this.localStorage = false;
      }
    }
  }
};
</script>