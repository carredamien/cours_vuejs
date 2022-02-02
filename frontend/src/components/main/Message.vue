<template>
  <main class="m-2">
    <div class="container col-md-6 bg-white rounded scroller ">
      <h1 class="text-center text-danger fs-3 fs-md-2 m py-3 "></h1>
      <div class="col-md-9 m-auto mt-5 mb-5">
        <button @click="returnPost" class="pos col-2 mb-3 btn btn-info add--post" >Retour</button>
        <div  class="card img-fluid mb-5">

      </div>
    </div>
  </main>
</template>

<script>
// import axios from 'axios'
// import Posts from '../../assets/Posts';
// import Users from '../../assets/Users';
// import Comments from '../../assets/Comments';

  // console.log(Users);
export default {
  name: 'Message',
  data(){
    return {
     Storagepost: [],
     Posts
    }
  },
   methods:{
    returnPost: function(){
      this.$router.push('/articles')
    }
  }
  // created(){
    //   axios
  //     .get(bdd)
  //     .then(reponse =>{
    //       for(const post of reponse.data){
      //         this.bdd.push(post)        }
  //     })
  // }
}
    // console.log(Posts);

</script>

<style lang="scss" scoped>
 main > .container{
    height: 80vh;
  }
  .img-message{
    width:100%;
    height: auto;
    max-height: 30rem;
    object-fit: cover;
    object-position: center;
  }
  .img-author{
    width:2rem;
    height: 2rem;
    border: 2px solid gray;
    border-radius: 50%;
    padding:0.1rem;
    margin-bottom: 0.6rem;
  }

// srcollbar
  .scroller {
    height: 90vh;
    overflow-y: scroll;
    scrollbar-color: #dc3545;
    // scrollbar-color: rebeccapurple green;
    scrollbar-width: thin;
    scroll-behavior: smooth;
  }

  /* Works on Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: transparent;
  }

  /* Works on Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 6px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #dc3545;
    border-radius: 20px;
  }

// comment
.dn{
  display:none;
}

// .comment--img{
//   width: 2.5rem;
//   height: 2.5rem;
//   border:2px solid #dc3545;
//   border-radius: 50%;
// }

</style>
