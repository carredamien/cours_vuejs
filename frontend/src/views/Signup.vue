<template>
   <main>
    <div class="container mt-md-5">
      <div id="login-row" class="row justify-content-center align-items-center">
        <div id="login-column" class="col-md-5">
          <div id="login-box" class="col-md-12 pb-4 mt-5 mb-5">
            <form id="login-form" class="form " action="" method="post">
              <h1 class="text-center text-danger text-info fs-5 fs-md-2 mb-md-2">Créer son compte</h1>
              <div class="d-flex justify-content-center align-items-center mt-4 mt-md-5">
                <a href="">
                <div class="d-flex flex-column align-items-center">
                 <!-- <label for="avatar"><img class="avatar rounded-circle" alt="icone utilisateur" src="../../assets/images/user_gray.png"></label> -->
                  <img v-if="avatar" class="avatar" :src="`${this.avatar}`"> 
                  <img v-else class="avatar avatar--default" src="@/assets/images/user_gray.png"> 
                  <input @change="changeImage" type='file' name="file" class="file" accept=".png, .jpg, .jpeg .webp" />
                  <label for="file"  class="label-file mt-2">Photo de profil</label>
                </div>
              </a>
              </div>
              <div class="form-group mb-2">
                <label for="name"  class="text-danger fw-md-bold fs-md-5">Nom :</label><br>
                <input v-model="lastname" type="text" name="name" id="name"  class="form-control">
                <p v-if="errors.lastname" class="text-danger fw-md-bold error--name error-b"> {{ errors.lastname }} </p>

              </div>
             <div class="form-group mb-2">
                <label for="firstname" class="text-danger fw-md-bold fs-md-5">Prénom :</label><br>
                <input v-model.trim="firstname" type="text" name="firstname" id="firstname"  class="form-control">
                <p v-if="errors.firstname" class="text-danger fw-md-bold error--name error-b"> {{ errors.firstname }} </p>
              </div>
               <div class="form-group mb-2">
                <label for="email" class="text-danger fw-md-bold fs-md-5">Adresse email :</label><br>
                <input  v-model.trim="email" type="email" name="email" id="email" class="form-control">
                <p v-if="errors.email" class="text-danger fw-md-bold error--name error-b"> {{ errors.email }} </p>
              </div>
              <div class="form-group mb-2">
                <label for="password" class="text-danger fw-md-bold fs-md-5 ">Mot de passe :</label><br>
                <input v-model.trim="password" type="text" name="password" id="password" class="form-control">
                <p v-if="errors.password" class="text-danger fw-md-bold error--name error-b"> {{ errors.password }} </p>
              </div>
              <div class="form-group d-grid gap-2 py-1 text-center">
                <!-- <input type="submit" name="submit" class="btn btn-danger btn-md fs-5 fw-bold" value="S'inscrire"> -->
                <button  @click.prevent="createAccount" class="btn btn-danger fs-5 fw-md-bold" type="button">S'inscrire</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'

  export default {
    name: 'Signup',
   
    data(){
      return { 
        avatar : false,
        isAdmin: 0,
        lastname: '',
        firstname:'',
        email:'',
        password:'',
        errors: {},
      }
    },

    methods:{
      changeImage: function(event){
        this.avatar= URL.createObjectURL(event.target.files[0]);
      },
      createAccount: function(){ 
        const avatar = document.querySelector("input[type=file]").files[0];
        const name = this.lastname.toLowerCase();
        const firstname = this.firstname.toLowerCase();
        const email = this.email.toLowerCase();
        const password = this.password;
        const isAdmin = 0;
      
        const formData = new FormData();
          formData.append("name", name);
          formData.append("firstname", firstname);
          formData.append("email", email);
          formData.append("password", password);
          formData.append("isAdmin", isAdmin);
          if (avatar) {
          formData.append("image", avatar);
          }

        if(name && firstname && email && password){  
         axios.post('http://localhost:3005/api/auth/signup', formData)
           .then((res) =>{ 
              alert(res.data.msg);
              this.$router.push("/connexion")
           }) 
           .catch((error) => {
                error
                alert('Emmail déjà utilisée')
             })
         
        
         }else{
           alert('Une erreur s\'est produite durant la création de votre compte');
         }
     },
      
    },
    watch:{
      lastname(newValue) {
        if(newValue.length <= 2)  {
          this.errors['lastname'] = 'Un nom de plus de 3 caractères est requis'
        } else if(newValue.length > 50) {
          this.errors['lastname'] = 'Le nom est trop long'
        }else {
          this.errors['lastname'] = ''
        }
      },
      firstname(newValue) {
        if(newValue.length <= 2) {
          this.errors['firstname'] = 'Un prénom d\'au moins 3 caractères est requis'
        } else if(newValue.length > 50) {
          this.errors['firstname'] = 'Le prénom est trop long'
        } else {
          this.errors['firstname'] = ''
        }
      },
      email(newValue){
        if (/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-zA-Z]{2,10}$/.test(newValue)) {
          this.errors['email'] = ''
        } else {
          this.errors['email'] = 'L\'adresse email n\'est pass valide'
        }
      },
      password(newValue) {
        if( /^(?=.*\d)(?=.*[a-z])[0-9a-z]{8,}$/.test(newValue)) {
          this.errors['password'] = ''
          }else {
          this.errors['password'] = 'Votre mot de passe doit contenir au minimum 8 caractéres dont 1 chiffre'
        }
      },
    }
  }
</script>

<style lang="scss" scoped>

  .avatar{
    position: absolute;
    z-index: -1;
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
    cursor: pointer;
  }

  .file {
    position: relative;
    z-index: 1;
    border:2px solid gray;
    height: 4rem;
    width: 8rem;
    border-radius: 50%;
    background: transparent;
    opacity:0;
    cursor: pointer;
  }
  .label-file {
      color: #dc3545;
      font-weight: bold;
  }
  a{
    text-decoration: none;
  }
  label{
    font-size: 1rem;
    font-weight: 700;
  }
  p{
    margin-bottom: 0;
    font-weight: 600;
  }
  .error-b{
    display: block;
  }
  .error-n{
    display: none;
  }

  #login-box{
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    opacity:1;
    padding: 2rem;
    border-radius: 0.5rem;
  }


  @media screen and (min-width:992px){
    .avatar{
      width:4.5rem;
      height: 4.5rem;
    } 
    p{
      margin-bottom: 1rem;
    }
  }
</style>