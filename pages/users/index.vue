<template lang="html">
  <div class="user">
    <div class="banner text-center">
      <h1>User <span v-if="$store.state.user">| {{ $store.state.user.name || 'Signed Out' }}</span></h1>
    </div>
    <div class="container">
      <div class="column col-xs-12 col-sm-10 col-md-8 col-lg-6 col-4 col-mx-auto">
        <h4>Change Password</h4>
        <form class="form" @submit="handleChangePassword">
          <div class="form-group">
            <label for="current_password" class="form-label">Current Password:</label>
            <input class="form-input" type="password" name="current_password" v-model="current_password" value="">
          </div>
          <div class="form-group">
            <label for="new_password" class="form-label">New Password:</label>
            <input class="form-input" type="password" name="new_password" v-model="new_password" value="">
          </div>
          <div class="form-group">
            <label for="confirm_new_password" class="form-label">Confirm New Password:</label>
            <input class="form-input" type="password" name="confirm_new_password" v-model="confirm_new_password" value="">
          </div>
          <div class="form-group">
            <input type="submit" class="btn btn-primary column col-ml-auto" value="Change Password">
          </div>
        </form>
        <div v-if="error" class="toast toast-warning mt-2">
          <button class="btn btn-clear float-right" @click="clearToast"></button>
          {{ error }}
        </div>
        <div v-if="success" class="toast toast-success mt-2">
          <button class="btn btn-clear float-right" @click="clearToast"></button>
          {{ success }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  data () {
    return {
      current_password: null,
      new_password: null,
      confirm_new_password: null,
      error: null,
      success: null
    }
  },
  middleware: ['auth'],
  methods: {
    handleChangePassword (e) {
      e.preventDefault()
      console.log(e.target.current_password.value)
      if (!this.new_password || !this.current_password || !this.confirm_new_password) {
        this.error = 'Please complete all fields'
        return
      }
      if (this.new_password !== this.confirm_new_password) {
        this.error = 'New passwords do not match'
        return
      }
      const data = {
        current_password: this.current_password,
        new_password: this.new_password
      }
      console.log('OK0', data, this.$store.state.user)

      /***
        API call to update password
      ***/
      const userId = this.$store.state.user.id
      console.log(userId)
      axios({
        method: 'PUT',
        url: `/api/users/${userId}`,
        data
      }).then(response => {
        console.log('Response from API', response)
        if (response.status === 201) {
          this.$store.commit('SET_USER', {
            email: response.data.email,
            name: response.data.name,
            id: response.data._id
          })
          console.log('Updated Store User', this.$store.state.user)
          this.current_password = ''
          this.new_password = ''
          this.confirm_new_password = ''
          this.success = 'Password Updated'
        }
        if (response.data.Error) {
          this.error = response.data.Error
        }
      })
    },
    clearToast () {
      this.error = null
      this.success = null
    }
  }
}
</script>

<style lang="css">
</style>
