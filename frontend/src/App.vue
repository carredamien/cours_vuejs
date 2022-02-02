<template>
  <div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/header/Header.vue";
import Footer from "./components/footer/Footer.vue";
const jwt = require("jsonwebtoken"); //appel de jwt pour les token
// require("dotenv").config(); //appel de dotenv pour la clé de salage

export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  data() {
    return {};
  },
  computed: {
    isAdmin: function() {
      const decodedToken = jwt.verify(
        this.currentUser.token,
        process.env.VUE_APP_TOKEN
      );
      const jwtIsAdmin = decodedToken.isAdmin;
      return jwtIsAdmin;
    }
  }
};
</script>

<style lang="scss">
body {
  background-color: #000;
  height: 100%;
  // overflow: hidden;
}
.bg {
  background: url("./assets/images/start.webp") no-repeat;
  background-position: center;
  width: 100%;
  height: 100vh;
}
.capitalize {
  text-transform: capitalize;
}
</style>
