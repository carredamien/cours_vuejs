<template>
 <main>
  <div class="container mt-1 mt-md-5">
    <div id="login-row" class="row justify-content-center align-items-center">
      <div id="login-column" class="col-md-4">
        <div id="login-box" class="col-md-12 ">
          <form id="login-form" class="form">
            <h1 class="text-center text-danger text-info fs-5 fs-md-2 mt-1 mb-3">Modifier mon profil</h1>
            <div class="d-flex justify-content-center align-items-center mt-4 mt-md-5">
              <a href="">
                <div class="d-flex flex-column align-items-center">
                  <img v-if="avatar" class="avatar" :src="`${this.avatar}`"> 
                  <img v-else class="avatar" src="../../assets/images/user_gray.png">  
                  <input @change="changeImage" id="fileAvatar" type='file' name="file" class="file" accept=".png, .jpg, .jpeg" />
                  <label for="file" class="label-file mt-2">Photo de profil</label>
                </div>
              </a>
            </div>
            <div class="form-group mb-2">
              <label for="name" class="text-danger fw-md-bold fs-md-5">Nom:</label><br>
              <input type="text" v-model="lastname" name="name" id="name" class="form-control required">
              <p v-if="errors.lastname" class="text-danger fw-md-bold error--name error-b"> {{ errors.lastname }} </p>
            </div>
            <div class="form-group mb-2">
              <label for="firstname" class="text-danger fw-md-bold fs-md-5">Prénom:</label><br>
              <input type="text" name="firstname" v-model="firstname" id="firstname" class="form-control required">
              <p v-if="errors.firstname" class="text-danger fw-md-bold error--name error-b"> {{ errors.firstname }} </p>
            </div>
            <div class="form-group mb-2">
              <label for="email" class="text-danger fw-md-bold fs-md-5">Adresse email:</label><br>
              <input v-model="email" type="email" name="email" id="email" class="form-control required">
              <p v-if="errors.email" class="text-danger fw-md-bold error--name error-b"> {{ errors.email }} </p>
            </div>
            <div class="form-group mb-2">
              <label for="password" class="text-danger fw-md-bold fs-md-5">Mot de passe:</label><br>
              <input v-model="password" type="text" name="password" id="password" class="form-control">
              <p v-if="errors.password" class="text-danger fw-md-bold error--name error-b"> {{ errors.password }} </p>
            </div>
            <div class="form-group mt-4 mb-2 d-grid gap-2 py-2 text-center ">
              <button @click.prevent="updateAccount()" class="btn btn-danger fs-5 fw-bold" type="button">Envoyer</button>
            </div>
          </form>
            <div class="form-group mb-2  text-end">
              <button @click.prevent="deleteAccount()" class="btn btn-secondary btn-sm deleteUser" type="button">Supprimer le compte</button>
            </div>
        </div>
      </div>
    </div>
  </div>
 </main>
</template>
<script>
  import axios from 'axios'

  export default {
    name: 'UpdateUser',
     data(){
       
       return {
        avatar: '',
        lastname: '',
        firstname:'',
        email:'',
        password:'',
        UserId:'',
        errors: {},
      }
    },
    methods:{
      changeImage: function(event){
        this.avatar= URL.createObjectURL(event.target.files[0]);
      },
      updateAccount: function(){ 
        const avatar = document.querySelector("input[type=file]").files[0];
        const UserId = localStorage.getItem('UserId');
        const name = this.lastname;
        const firstname = this.firstname;
        const email = this.email;
        const password = this.password;
        

        const formData = new FormData();
          formData.append("UserId", UserId);
          formData.append("name", name);
          formData.append("firstname", firstname);
          formData.append("email", email);
          formData.append("password", password);
          if (avatar) {
          formData.append("image", avatar);
          }
        if(UserId && name && firstname && email && password){
          axios.put(`http://localhost:3005/api/auth/update/${ UserId }`, formData)
          .then(() =>{
              alert('Compte modifié, les mises à jour seront visiblent dès la prochaine connexion');
            this.$router.push('/articles');
          })
          .catch('error =>{error}') 
        }else{
          alert('Vous n\'avez pas rempli tout les champs')
        }
         
      },
      deleteAccount: function(){
        const UserId = localStorage.getItem('UserId')
        confirm('Cette action est irréversible et supprimera toutes vos données')
        
          axios.delete(`http://localhost:3005/api/auth/delete/${UserId}`)
          .then(() =>{
            localStorage.clear('token');
            localStorage.clear('UserId');
            localStorage.clear('author');
            alert('Votre compte à été supprimé')
            setTimeout(location.replace('/accueil'), 3000)
          })
          .catch((error) => error)
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
        if(/^(?=.*\d)(?=.*[a-z])[0-9a-z]{8,}$/.test(newValue)) {
          this.errors['password'] = ''
          }else {
          this.errors['password'] = 'Votre mot de passe doit contenir au minimum 4 caractéres et 1 chiffre'
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
.error{
  display: none;
}
input[type= checkbox]{
  width: 1rem;
  height: 1rem;
}
.deleteUser{
  font-size: 1rem!important;

}

 @media screen and (min-width:992px){
   .avatar{
     width:4.5rem;
     height: 4.5rem;
   }
    .deleteUser{
      font-size: 1.2rem;
   
    }
}
</style>