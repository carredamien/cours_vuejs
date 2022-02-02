<template>
  <main>
    <div class="container">
      <div id="login-row" class="row justify-content-center align-items-center">
        <div id="login-column" class="col-md-4">
          <div id="login-box" class="col-md-12">
            <form @submit.prevent="checkForm"  id="login-form" class="form" action="" method="post">
              <h1 class="text-center text-danger text-info  fs-5 fs-md-2  mt-md-1 mb-md-3">Se connecter</h1>
              <div class="form-group mb-md-2 mb-2">
                <label for="email" class="text-danger fs-md-5 fw-bold">Adresse email :</label><br>
                <input  v-model="email" type="email" name="email" id="email" class="form-control" required>
                <p v-if="errors.email" class="text-danger fw-md-bold error--name error-b"> {{ errors.email }} </p> 
              </div>
              <div class="form-group mb-md-2">
                <label for="password" class="text-danger fs-md-5 fw-bold">Mot de passe:</label><br>
                <div class="input-password">
                  <input v-model="password" :type="showPassword ? 'text' : 'password'" name="password" id="password" class="form-control" required>
                  <div @click="showPassword = !showPassword" class="password-icon">
                    <i v-if="!showPassword" class="bi bi-eye"></i>
                    <i v-else class="bi bi-eye-slash"></i>
                  </div>
                </div>
                <p v-if="errors.password" class="text-danger fw-md-bold error--name error-b"> {{ errors.password }} </p>
              </div>
              <div class="form-group mb-2 d-grid gap-2 py-2 mt-4 text-center ">
                <button  class="btn btn-danger fs-5 fw-bold" type="submit">Connexion</button>
              </div>
              <p v-if="errors.connect" class="text-danger fw-bold fs-5 error--name error-b"> {{ errors.connect }}</p>
              <div class="form-group d-grid gap-2  mt-4 text-center ">
                <button  @click="signup" class="btn btn-primary fs-5 fw-bold" type="button">Oups, je n'ai pas de compte...</button>
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
  name: 'Login',

    data(){
      return {
          email:'',
          password: '',
          avatar:'',
          errors: {},
          showPassword: false,
      }
    },
 
    methods:{
      signup: function(){
        this.$router.push('/inscription')
      },    

      checkForm: function() {
        if (this.email && this.password) {
          // {email: this.email, password: this.password}
          this.$store.dispatch('login', {email: this.email, password: this.password})
          .then(() => {
            this.$router.push('/articles');
          })
        }
        else{
          alert('Il faut remplir votre email et votre mot de passe')
        }
      },
    },
    computed:{
   
    },
    watch:{
      email(newValue){
        if (/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-zA-Z]{2,10}$/.test(newValue)) {
          this.errors['email'] = ''
        } else {
          this.errors['email'] = 'L\'adresse email n\'est pas valide'
        }
      },
      password(newValue) {
        if( /^(?=.*\d)(?=.*[a-z])[0-9a-z]{7,}$/.test(newValue)) {
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
    width: 6rem;
  }
  a{
  text-decoration: none;
}
.container{
  margin-top: 4rem;
}
.error{
  display: block;
}
h3{
  margin-bottom: 2rem;
}
#login-box{
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  opacity:1;
  padding: 2rem;
  border-radius: 0.5rem;
}

.input-password{
  position: relative;
}
.password-icon{
  position: absolute;
  font-size: 1.5rem;
  top:50%;
  transform: translateY(-50%);
  right:0.5rem;
  cursor: pointer;
}

@media screen and (min-width:992px){
    .container{
    margin-top: 8rem;
    }
  }
</style>