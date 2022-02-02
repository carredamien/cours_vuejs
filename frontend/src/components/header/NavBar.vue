<template>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav mt-4 mt-md-0 fw-bold">
      
        <li class="nav-item mx-3">
          <router-link :to="{ name: 'Home'}" class="nav-link text-center">Accueil</router-link>
        </li>
        <li class="nav-item mx-3">
          <router-link :to="{ name: 'Posts'}" class="nav-link text-center ">Actualités</router-link>
        </li>
        <li class="nav-item">
          <router-link  v-if="!currentUser" :to="{ name: 'Login'}"  class="nav-link text-center ">Se connecter</router-link>
          <router-link  v-else :to="{ name: 'Disconnected'}" class="nav-link text-center " >Déconnexion &nbsp;  </router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="currentUser" :to="{ name: 'Settings'}" class="nav-link text-center" aria-current="réglages" > <i class="settings--icon bi bi-gear-fill "></i> </router-link>
        </li>

      </ul>
    </div>
</template>

<script>

  export default {
    name: 'NavBar',
    computed: {
      currentUser() {
        return this.$store.state.currentUser;
      }
    }
  }
  
</script>

<style lang="scss" scoped>
 .navbar-nav{
    margin-left:auto!important;
 }
    ul{
       font-size: 1.2rem;
     }
  .navbar-toggler{
    border: none;
  }
 a{
   text-decoration: none;
 }
  .settings{
    width:2rem;
    height: auto;
    margin-left: 0rem;
  } 
  .router-link-active{
    color: #dc3545!important;
  }
  @media screen and (min-width:992px){
    .navbar-nav{
      margin-left:auto!important;
      margin-right: 4rem;
    }
    .settings{
      margin-left: 2rem;
      &--icon{
        font-size: 1.4rem;
      }
    }
    
  }
</style>