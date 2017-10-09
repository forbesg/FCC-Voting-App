<template>
  <div>
    <my-header :user="$store.state.user"/>
    <nuxt/>
    <my-footer/>
  </div>
</template>

<script>
import MyHeader from '~/components/Header.vue'
import MyFooter from '~/components/Footer.vue'

export default {
  data () {
    return {
      user: null
    }
  },
  components: {
    MyHeader,
    MyFooter
  }
}
</script>

<style lang="scss">

.button, .button:visited
{
  display: inline-block;
  color: black;
  letter-spacing: 1px;
  background-color: #fff;
  border: 2px solid #000;
  text-decoration: none;
  text-transform: uppercase;
  padding: 15px 45px;
}

.button:hover, .button:focus
{
  color: #fff;
  background-color: #000;
}

.title
{
  color: #000;
  font-weight: 300;
  font-size: 2.5em;
  margin: 0;
}

.banner {
  color: #444;
  display: flex;
  justify-content: center;
  flex-direction: column;
  // height: 200px;
  margin-bottom: 10px;
  padding: 30px 0;
  h1 {
    font-size: 1.6rem;
  }
  h4 {
    font-size: 1rem;
  }
  .action_buttons {
    a {
      margin: 10px;
    }
  }
}
</style>
