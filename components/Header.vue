<template lang="html">
  <div class="header">
    <div class="brand">
      <img src="~static/logo-small.png" alt="Logo" />
      <div class="title">
        <h1><nuxt-link to='/'>{{$store.state.title}}</nuxt-link></h1>
      </div>
    </div>
    <div class="nav">
      <nuxt-link v-if="user" :to="{ name: 'users', params: {} }" class="btn btn-link">{{user.name}}</nuxt-link>
      <nuxt-link v-if="user" :to="{ name: 'dashboard', params: {} }" class="btn btn-link">Dashboard</nuxt-link>
      <nuxt-link :to="{ name: 'polls', params: {} }" class="btn btn-link">Polls</nuxt-link>
      <nuxt-link :to="{ name: 'register', params: {} }" v-if="!user" class="btn btn-link">Register</nuxt-link>
      <nuxt-link :to="{ name: 'login', params: {} }" v-if="!user" class="btn btn-link">Login</nuxt-link>
      <a href="/logout" v-if="user" @click="handleLogout" class="btn btn-link">Logout</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  props: ['user'],
  methods: {
    handleLogout (e) {
      e.preventDefault()
      axios.get('/api/logout').then(() => {
        console.log('Logged Out')
        this.$store.commit('UNSET_USER')
        this.$router.push('/login')
      })
    }
  },
  ...mapActions(['logout'])
}
</script>

<style lang="scss">
  .header {
    background-color: #2d3c69;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 5px 20px;
    @media (min-width: 600px) {
      flex-direction: row;
    }
    .brand {
      display: flex;
      align-items: center;
      img {
        height: 50px;
        width: 50px;
      }
      .title {
        h1 {
          a {
            color: #fff;
            font-size: 24px;
            margin: 0 0 0 20px;
            text-decoration: none;
            &:hover {
              color: #ddd;
            }
          }
        }
      }
    }

    .nav {
      display: flex;
      flex-direction: row;
      a {
        color: #fff;
        &.nuxt-link-exact-active {
          color: #d62727;
        }
        &:hover {
          color: #ddd;
        }
        &:focus {
          box-shadow: none;
          outline: none;
        }
      }
    }
  }

</style>
