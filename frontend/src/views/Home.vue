<template>
   <main>
    <div class="display-home px-4 py-5 my-md-5 col-md-7 text-center mx-auto">
      <h1 class="h1-modale display-5 fw-bold">Bienvenue sur le réseau social <br> de votre entreprise</h1>
      <div class="col-lg-6 mx-auto">
        <p class="p-modale lead mt-4 fs-3">Apprenez à connaître vos collègues et collaborateurs...</p>
      </div>
    <button v-show="!this.$store.state.currentUser" @click="signup" class="btn btn-outline-danger">S'inscrire</button>
    </div>
  </main>
</template>

<script>

 export default {
  name: 'Home',
  data(){
    return {
      
      
    }
  },
  methods:{
    signup: function(){
      this.$router.push('/inscription')
    }, 
  },
   
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
   font-weight: bold;
   border: 2px solid white;
   border-radius: 0.5rem!important;
   color:#dc3545;
   transition: 0.5s ease-in;
   &:hover{
     border: 2px solid #dc3545;
     color: white;
   }
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