<template>
   <main>
    <div class="display-home px-4 py-5 my-md-5 text-center">
      <h1 class="h1-modale display-5 fw-bold">404 - Page non trouvée </h1>
      <div class="col-lg-6 mx-auto">
        <p class="p-modale lead mt-4 fs-3">Vous êtes perdu... <br> Cliquez sur le bouton suivant pour retourner à l'accueil </p>
      </div>
    <button @click="home" class="btn btn-outline-danger">Revenir à l'accueil</button>
    </div>
  </main>
</template>

<script>
  export default {
     name: 'NotFound',
     methods:{
       home: function(){
         this.$router.push('/')
       }
     }
  }
</script>

<style lang="scss" scoped>
.h1-modale{
    color: #fff;
  }
  
  .p-modale{
    color: #Dc3545;
     font-weight:bold;
  }
  .btn{
   margin-top: 0rem;
   padding: 0.2rem 4rem;
   font-size: 1.8rem;
   border: 2px solid #dc3545;
   border-radius: 0.5rem!important;
   color:#fff;
  }
   @media screen and (min-width:992px){
     .p-modale{
      font-weight:normal;
    }
    .btn{
      margin-top: 1.5rem;
    }
   }
</style>