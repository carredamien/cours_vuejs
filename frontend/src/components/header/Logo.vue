<template>
  <router-link :to="{ name: 'Home'}"> <a class="navbar-brand" href="/index.html"><img class="logo img-fluid" src="../../assets/images/icon-left-font-monochrome-white3.png" alt="Logo Groupomania"></a></router-link>
</template>

<script>
  export default {
    name: 'Logo'
  }
</script>

<style lang="scss" scoped>
  .logo{
    width: 10rem;
    margin-left: 1rem;
  }
  @media screen and (min-width:992px){
    .logo{
      width: 15rem;
      margin-left: 4rem;
    }
  }
</style>