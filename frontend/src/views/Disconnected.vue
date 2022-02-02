<template>
  <main>
    <div class="container">
      <div id="login-row" class="row justify-content-center align-items-center">
        <div id="login-column" class="col-md-4">
          <div id="login-box" class="col-md-12">
            <form id="login-form" class="form" action="" method="post">
              <h1 class="text-center text-danger text-info  fs-3 fs-md-2  mt-md-1 mb-md-3">Déconnexion</h1>
              <div class="form-group mb-2 d-grid gap-2 py-2 mt-4 text-center ">  
                <button @click="disconnected" class="btn btn-primary fs-5 fw-bold" type="button">Se déconnecter</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>

  export default {
    name: 'Disconnected',
    data(){
      },

    // computed: {
    //   disconnected(){
    //     return this.$store.dispatch('logout')
    //   },
    // },
    methods:{
      // TO DELETE
      disconnected: function(){
        this.$store.dispatch('logout')
        .then(() => {
            this.$router.push('/');
          })
      }
    }
  
    
  }
</script>

<style lang="scss" scoped>
 .avatar{
    width: 6rem;
  }
  a{
  text-decoration: none;
}
.container{
  margin-top: 4rem;
}
.error{
  display: none;
}
h3{
  margin-bottom: 2rem;
}
 @media screen and (min-width:992px){
    .container{
    margin-top: 8rem;
    }
  }
</style>