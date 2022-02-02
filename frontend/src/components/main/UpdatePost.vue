<template>
  <main class="m-2">
    <div class="container col-lg-6 bg-white rounded">
      <h1 class="text-center text-danger fs-4 fs-lg-2 mt-2 pt-2 ">Modifier mon article</h1>
      <div class="col-lg-9 m-auto mt-3 mb-5">
        <form id="addPost" class="form">
          <button @click="returnPost" class="return col-md-2 mb-lg-3 btn btn-primary add--post" >Retour</button>
          <div class="row justify-content-center align-items-center mt-md-5 text-center">
            <img v-if="imageUrl" class="img-message " :src="`${this.imageUrl}`" :alt="`${this.title}`">
            <img v-else class="img-message " src="@/assets/images/image-default.png" alt="">
            <input @change="changeImage" class="file mt-3" type='file' name="image" accept=".png, .jpg, .jpeg" />
            <label v-if="!imageUrl" for="imageUrl"  class="label-file">Ajouter une image</label>
          </div>
          <div class="col-md-7 mt-md-5  m-auto">
            <div class="form-group mb-2 ">
            <label for="title" class="text-danger fw-bold fs-md-5 mt-md-3">Titre:</label><br> 
            <input type="text" v-model.lazy="title" name="title" id="title" class="form-control required">
          </div>
          <div class="form-group mb-md-2 mb-1">
            <label for="content" class="text-danger fs-md-5 fw-bold">Message:</label><br>
            <textarea  v-model.lazy="content" class="form-control" name="content" id="content"></textarea>
          </div>
          <div class="form-group  mb-2 d-grid gap-2 py-2 text-center "> 
            <button  @click.prevent="updatePost()"  class="btn btn-danger fs-5 fw-bold" type="button">Envoyer</button>
          </div>
         </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Message',
  data(){
    return {
    id: this.$route.params.id,
    imageUrl:'',
    title:'',
    content:this.$route.params.content,
    firstname:'',
    UserId:'',
    errors: {},
    }
  },
 
  methods:{
    returnPost: function(){
      this.$router.push('/articles');
    },
    changeImage: function(event){
      this.imageUrl= URL.createObjectURL(event.target.files[0]);
    },
    updatePost: function(){
    const id = this.$route.params.id;
    const imageUrl = document.querySelector("input[type=file]").files[0];
    const UserId = localStorage.getItem('UserId');
    const title = this.title;
    const content = this.content;
    const author = localStorage.getItem('author')

    const formData = new FormData();
      formData.append("UserId", UserId);
      formData.append("title", title);
      formData.append("content", content);
      formData.append("author", author);
      if (imageUrl) {
        formData.append("image", imageUrl);
      }
      if(this.title && this.content || imageUrl){
        axios.put(`http://localhost:3005/api/post/${id}`, formData)
        .then(() =>{
          alert('Votre article est modifié')
          this.$router.push('/articles')
        })
        .catch(error =>{error})
      }else{
        alert('Il faut remplir le titre et le message')
      }
    },
  }
}

</script>

<style lang="scss" scoped>
 main > .container{
    height: 80vh;
  }
  .img-message{
    position: absolute;
    z-index: 0;
    margin-top:0;
    width:14rem;
    height: auto;
    max-height: 8rem;
    object-fit: cover;
    object-position: center;
    opacity:1;
    
  }

.file {
  position: relative;
  z-index: 1;
  height: 8rem;
  width:20rem;
  background: transparent;
  opacity:0;
  cursor: pointer;
}
.label-file {
  position: absolute;
  color: #797979;
  font-weight: bold;
  margin-top: 5rem;
}
#content{
  height: 8rem!important;
}
.img-author{
  width:2rem;
  height: 2rem;
  border: 2px solid gray;
  border-radius: 50%;
  padding:0.1rem;
  margin-bottom: 0.6rem;
}
a{
  text-decoration:none;
  color: rgb(0, 0, 0);
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
  .return{
    font-size: 1rem;
    font-weight: 600;
    color:#fff;
    padding:0.2rem 0.4rem;
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
 @media screen and (min-width:992px){
  .img-message{
      // position: absolute;
      // z-index: 0;
      margin-top: 0.5rem!important;
      width:26.5rem;
      height: auto;
      max-height: 15rem;
    }
  .label-file {
    position: absolute;
    margin-top: 8rem;
  }
    .return{
    font-size: 1.2rem;
  }
 }
</style>