<template>
  <footer class="bg- text-center text-lg-start">
    <div class="footer col-12 mx-auto text-center text-danger d-flex justify-content-center align-items-center border-top">
      <h5>© 2021 Copyright:<a class="text-danger " href="https://groupomania.com/"> Groupomania</a></h5> 
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'Footer'
  }
</script>

<style lang="scss" scoped>
  .footer{
    position: fixed;
    background-color: transparent;
    bottom:0;
    left:0;
    font-size: 1rem;
    font-weight: bold;
    height: 4rem;
    & p {
      margin-top: 1rem;
    }
    & a {
      text-decoration: none;
    }
  }


 @media screen and (min-width:992px){
   .footer{
     font-size: 1.2rem;
     letter-spacing: 0.12rem;
   }
  }
</style>