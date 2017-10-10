<template lang="html">
  <div class="container columns">
    <div class="form-container column col-xs-12 col-sm-10 col-md-8 col-lg-6 col-4 col-mx-auto">
      <header class="">
        <div class="toast toast-error" v-if="message">
          <button class="btn btn-clear float-right" @click="handleCloseToast"></button>
          {{ message }}
        </div>
        <h1>Login</h1>
      </header>
      <form class="form form-horizontal" @submit="handleSubmit">
        <div class="form-group columns" >
          <label for="email" class="form-label">Email: </label>
          <input class="form-input" type="email" name="email" v-model="email" value="" />
        </div>
        <div class="form-group columns">
          <label for="password" class="form-label">Password: </label>
          <input class="form-input" type="password" name="password" v-model="password" value="" />
        </div>
        <div class="form-group columns">
          <button class="btn btn-primary column col-xs-12 col-3 col-ml-auto" type="submit">Login</button>
        </div>
      </form>
      <div class="divider text-center" data-content="OR"></div>
      <div class="column col-12 social-login">
        <span class="twitter-sprite" :style="{ backgroundImage: `url(${sprite})`}"></span>
        <a href="/api/auth/twitter" class="btn twitter float-right" >Sign In With Twitter</a>
      </div>
      <div class="divider text-center" data-content="OR Register"></div>
      <div class="column col-12 register">
        <nuxt-link class="btn btn-link text-center" :to="{ name: 'register', params: {} }">Need to register?</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import sprite from '@/assets/img/twitter-bird.jpg'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      message: null,
      email: '',
      password: '',
      sprite
    }
  },
  asyncData ({ req }) {
    if (req && req.flash) {
      return {
        message: req.flash('error')[0]
      }
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      if (this.email === '' || this.password === '') {
        this.message = 'Please enter both email and password'
        return
      }
      axios({
        method: 'POST',
        url: '/api/login',
        data: {
          email: this.email,
          password: this.password
        }
      }).then(response => {
        if (response.status === 401) {
          throw new Error('Bad Credentials')
        } else {
          // If user credentials are valid return user
          this.login(response.data)
          this.$router.replace('/dashboard')
        }
      }).catch(err => {
        console.log(err)
        this.message = 'Email or password are Incorrect'
      })
    },
    handleCloseToast () {
      this.message = null
    },
    ...mapActions({
      login: 'login'
    })
  }
}
</script>

<style lang="scss" scoped>
  .form-container {
    margin-top: 50px;
    .toast {
      margin-bottom: 20px;
    }
  }
  .social-login {
    display: flex;
    justify-content: center;
    margin: 30px 0;
    span.twitter-sprite {
      display: inline-block;
      background-size: auto 36px;
      height: 36px;
      width: 36px;
      margin: 0;
    }
    .twitter {
      background-color: #00aced;
      border-color: #ddd;
      color: #fff;
    }
  }

</style>
