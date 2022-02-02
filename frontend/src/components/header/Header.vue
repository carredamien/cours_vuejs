<template>
  <header>
    <nav class=" navbar navbar-expand-lg navbar-dark bg-transparent">
      <div class="container-fluid">
        <Logo/>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <NavBar/>
      </div>
    </nav>
  </header>
</template>

<script>
  import NavBar from './NavBar.vue'
  import Logo from './Logo.vue'

  export default {
    name: 'Header',
    components:{
      NavBar,
      Logo
    },
 
  }
</script>

<style lang="scss">

</style>