<template lang="html">
  <div class="register container columns">
    <div class="form-container column col-xs-12 col-sm-10 col-md-8 col-lg-6 col-xl-6 col-4 col-mx-auto">
      <div class="toast toast-error" v-if="message">
        <button class="btn btn-clear float-right" @click="handleCloseToast"></button>
        {{ message }}
      </div>
      <h1>Register</h1>
      <form class="form form-horizontal" action="/api/register" method="post" @submit="handleFormSubmit">
        <div class="form-group columns" >
          <label for="name" class="form-label">Name: </label>
          <input class="form-input" type="text" name="name" v-model="name" value="" />
        </div>
        <div class="form-group columns">
          <label class="form-label" for="email">Email: </label>
          <input class="form-input" type="email" name="email" value="">
        </div>
        <div class="form-group columns">
          <label class="form-label" for="password">Password: </label>
          <input class="form-input" type="password" name="password" v-model="password" value="">
        </div>
        <div class="form-group columns">
          <label class="form-label" for="password2">Confirm Password: </label>
          <input class="form-input" type="password" name="password2" v-model="password2" value="">
        </div>
        <input v-if="$route.query.poll" hidden name="poll" :value="$route.query.poll" />
        <div class="form-group columns">
          <input class="btn btn-primary column col-3 col-ml-auto" type="submit" value="Register">
        </div>
      </form>
      <div class="divider text-center" data-content="Already registered?"></div>
      <div class="text-right">
        <nuxt-link class="btn btn-default text-center" :to="{ name: 'login', params: {} }">Login Here</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: null,
      name: '',
      password: '',
      password2: ''
    }
  },
  asyncData ({ req }) {
    let message = null
    if (req && req.flash) {
      message = req.flash('error')[0]
    }
    return {
      message
    }
  },
  methods: {
    handleFormSubmit (e) {
      if (this.name === '' || this.email === '' || this.password === '' || this.password2 === '') {
        e.preventDefault()
        this.message = 'Please enter all fields'
        return
      }
      if (this.password !== this.password2) {
        e.preventDefault()
        this.message = 'Passwords do not match'
      }
    },
    handleCloseToast () {
      this.message = null
    }
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
</style>
