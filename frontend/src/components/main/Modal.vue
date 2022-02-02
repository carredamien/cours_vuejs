<template>
  <main class="d-flex  justify-content-center align-items-center">
    <div class="container">
      <div id="login-row" class="row justify-content-center align-items-center">
        <div id="login-column" class="col-md-4">
          <div id="login-box" class="col-md-12">
              <h1 class="text-center text-danger text-info  fs-1 fs-md-2  mt-md-1 mb-md-3">déconnexion</h1>

          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
   export default {
    name: 'Modal',
    props: ['revele'],
    data(){
      },
    methods:{
     
    }
  
    
  }
</script>

<style lang="scss" scoped>

  a{
  text-decoration: none;
}
.container{
  position: fixed;
  margin-top: 4rem;
}
main{
  margin-top:10% ;
}
.error{
  display: none;
}
h3{
  margin-bottom: 2rem;
}
.div#login-row{
  justify-content: center;
  align-items: center;
}
 @media screen and (min-width:992px){
    .container{
      
    margin-top: 8rem;
    }
  }
</style>