<template lang="html">
  <div class="polls">
    <div class="banner text-center">
      <h1>Polls</h1>
    </div>
    <div class="column col-4 col-xl-6 col-lg-6 col-md-8 col-xs-12 col-sm-10 col-mx-auto">
      <FGTable :polls="polls || $store.state.polls" />
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import FGTable from '~/components/table'
export default {
  date () {
    return {
      polls: null
    }
  },
  async asyncData ({ isServer, store }) {
    console.log('Getting polls')
    let polls = await axios.get('/api/polls', {
      credentials: 'same-origin',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      store.state.polls = response.data
      return response.data
    })
    return {
      polls,
      name: isServer ? 'Server' : 'Client'
    }
  },
  components: {
    FGTable
  }
}
</script>

<style lang="css">
</style>
