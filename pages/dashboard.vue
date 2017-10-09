<template lang="html">
  <div class="dashboard">
    <div class="banner text-center">
      <h1>Dashboard</h1>
      <div class="action_buttons">
        <nuxt-link :to="{ name: 'dashboard', params: {} }" class="btn btn-primary">My Polls</nuxt-link>
        <nuxt-link :to="{ name: 'dashboard-create', params: {} }" class="btn btn-warning">New Poll</nuxt-link>
      </div>
    </div>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  middleware: ['auth']
}
</script>

<style lang="scss">

</style>
