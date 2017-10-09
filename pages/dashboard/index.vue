<template lang="html">
  <div class="my-polls-container column col-xs-12 col-sm-10 col-md-8 col-lg-6 col-4 col-mx-auto">
    <h4>My Polls</h4>
    <div class="toast toast-default text-center" v-if="!polls || polls.length < 1">
      <h2>You Have No Polls</h2>
      <h6>Click New Poll above to Add your First</h6>
    </div>
    <FGTable :polls="polls" :owner="true" :handleDelete="handleDelete" />
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import FGTable from '~/components/table'
export default {
  data () {
    return {
      polls: this.$store.state.polls,
      name: null
    }
  },
  async asyncData ({ isServer, store }) {
    let polls = await axios.get('/api/polls', {
      credentials: 'same-origin',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.data.filter(poll => {
        return poll.owner.email === store.state.user.email
      })
    })
    return {
      polls,
      name: isServer ? 'Server' : 'Client'
    }
  },
  methods: {
    handleDelete (id) {
      // Passed to table component as props to handle poll deletion event
      const updatedPollsArray = this.polls.filter(poll => {
        return poll._id !== id
      })
      axios.delete(`/api/polls/${id}`).then((response) => {
        if (response.status === 200) {
          console.log('Poll deleted')
          this.polls = updatedPollsArray
          this.$store.commit('UPDATE_POLLS', updatedPollsArray)
        }
      }).catch(err => {
        console.log('Deletion Error', err)
      })
    }
  },
  components: {
    FGTable
  }
}
</script>

<style lang="css">
</style>
