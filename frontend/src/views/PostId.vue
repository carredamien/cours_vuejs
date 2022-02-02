<template>
   <main class="m-2">
    <!-- <div v-if="loading === true">Chargement</div> -->
    <div v-if="loading === false" class="container col-md-8 bg-white rounded scroller "> 
      <h1 class="text-center text-danger fs-4 fs-md-2 mt-2 py-3 "> {{ post? post.title: '' }}</h1>
    <button @click="returnPost" class="return col-md-2 mb-lg-3 btn btn-primary add--post" >Retour</button>
      <div class="col-md-9 m-auto mt-5 mb-5">
          <div class="card img-fluid mb-5">
              <img v-if=" post? post.imageUrl: '' " class="img-message" :src=" post.imageUrl" :alt="post.title">
            <div class="card-body">
              <h3 class="card-title ">{{ post? post.title: '' }}</h3>
              <p class="card-text">{{ post? post.content: '' }}</p>
              <p class="text-secondary mb-3">
                Publié par <span class="fw-bold capitalize">{{ post? post.author: '' }}</span> 
              </p>  
              <div v-on:click.prevent="showComments" class="mt-1 d-flex" id="showComments">
                  <a  v-if="!comment" @click.prevent="displayComment" class=" text-decoration-none text-danger fw-bold border border-danger p-2 rounded btn--comment " href="">Voir les commentaires</a>
                  <a  v-else class="text-decoration-none text-danger fw-bold border border-danger p-2 rounded btn--comment" href="">Ne plus voir les commentaires</a>
                  <button v-if="author == authorConnect" @click.prevent.stop="updatePost" class="btn--delete btn btn-danger  mx-3">Modifier</button>
                  <button v-if="author == authorConnect || this.isAdmin" @click.prevent.stop="deletePost(this.isAdmin)" class="btn--delete btn btn-secondary  mx-3">Supprimer</button>
                </div>
              </div>
            
              <!-- <div  v-if="comment" class="my-3 p-3 bg-body rounded ">
                <h6 class="border-bottom pb-2 mb-0">Les commentaires : </h6>
                <div v-for="(getComment, index) in getComments" :key="index" class="comment--message d-flex flex-column text-muted pt-3">
                  <div class=" d-flex flex-row col-6 ">
                    <img v-if="getComment.avatar" name="avatar" class="avatar mt-1 mx-1 rounded" :src="`${getComment.avatar}`">
                    <img v-else class="avatar mx-1" src="../../assets/images/user_gray.png">
                    <div class=" d-flex flex-row ">
                    <p class="comment--created mb-1 mb-md-0 mt-md-1">le: {{createdDate(getComment.created)}} par</p>
                    <p class="comment--author mb-1 mb-md-0 mt-md-1"><strong class="d-block text-gray-dark capitalize">&nbsp;{{ getComment.author }}:</strong> </p>
                    </div>
                    <div v-if="UserId == getComment.UserId || this.isAdmin " @click="deleteComment(getComment.id)" class="delete--comment">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
                      <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                      </svg>
                    </div>
                  </div>
                <div class="row col-11  m-auto">
                  <p class="message  text-dark pb-3 mt-1 mb-0 small lh-sm border-bottom fst-italic ">
                    &nbsp;{{ getComment.message }}
                  </p>
                </div> 
                </div> 
              
                <div class="col-12">
                  <form v-if="comment" id="comments" class="form">
                    <div class="form-group mb-md-2 mb-1">
                    <label for="comment" class="text-danger fs-md-5 mt-3 fw-bold">Ajoutez votre commentaire:</label><br>
                    <textarea  v-model.lazy="message" class="form-control" name="comment" id="comment"></textarea>
                    <button @click.prevent="addMessage" class="btn btn-danger mt-1 col-12">Envoyer</button>
                  </div>
                </form>
                </div>-->
              
              </div> 
            </div>
          </div>          
  <!-- <div style="background:white">
    <div v-if="loading === true">Chargement</div>
    <div v-if="loading === false">
     
      <pre> {{ post }} </pre>
    
    </div>
  </div> -->
      <!-- </div>   -->
              
  </main>
</template>

<script>
import axiosClient from '@/utils/axiosClient';

export default {
  data() {
    return {
      loading: false,
      post: null,
    }
  },
  mounted() {
    this.loading = true;
    return axiosClient.get(`/api/post/${this.$route.params.id}`)
    .then(response => {
        this.post = response.data;
    })
    .finally(() => {
      this.loading = false;
    })
  },
  methods:{
    returnPost: function(){
      this.$router.push('/articles')
    },
  
    createdDate: function(date){
      const createdDate = new Date(date);
      return createdDate.toLocaleDateString('fr-FR');
    },
  }
}
</script>

<style lang="scss" scoped>
 main > .container{
    height: 80vh;
  }
  .img-message{
    width:100%;
    height: auto;
    max-height: 35rem;
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
  a{
    text-decoration:none;
    color: rgb(0, 0, 0);
  }
  .avatar{
    width: 32px;
    height: 32px;
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
  .pos{
    font-size: 1.8rem;
    padding:0rem;
    font-weight: bold;
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

  //comment
  .comment{
  display:none!important;
}
.add{
  padding: 0;
  font-size: 1rem!important;
}
  .addComment{
  display:none!important;
}
.comment--img{
  width: 2.5rem;
  height: 2.5rem;
  border:2px solid #dc3545;
  border-radius: 50%;
}
.btn--delete, .btn--comment{
font-size: 0.7rem
}
textarea{
  min-height: 5rem;
  max-height: 10rem;
}
.message{
  font-size: 0.9rem;
}
.comment--author, .comment--created{
  font-size: 0.8rem;
}
.comment--message{
  position: relative;
}               
.delete--comment{
  position: absolute;
  right:0;
  font-size: 2rem;
  cursor: pointer;
}
 @media screen and (min-width:992px){
 .return{
    font-size: 1.2rem;
    margin-left: 2.3rem;
  }
  .message{
    font-size: 1.1rem;
  }
  .comment--author, .comment--created{
  font-size: 1rem;
}
.btn--delete, .btn--comment{
font-size: 0.9rem
}
 }
</style>
