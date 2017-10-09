<template lang="html">
  <div class="text-center" v-if="poll">
    <div class="banner">
      <h1>{{ poll.question }}</h1>
      <h4>
        A Poll By: {{ poll.owner.name }}
      </h4>
    </div>
    <div v-if="!updated" class="form-container column col-xs-12 col-sm-10 col-md-6 col-4 col-mx-auto">
      <form class="form" action="index.html" method="post" @submit="handleAnswerSubmit">
        <div class="form-group">
          <label for="answer" v-for="answer, index in poll.answers" :key="index">{{answer.answer}}
            <input type="radio" name="answer" :value="index" />
          </label>
        </div>
        <div v-if="$store.state.user" class="form-group">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
        <div v-if="!$store.state.user" class="form-group">
          <p>
            You have to be logged in to vote
          </p>
          <div class="login-buttons container">
            <div class="columns">
              <nuxt-link to='/login' class="btn btn-primary column col-xs-12 col-4">Login</nuxt-link>
              <nuxt-link to='/register' class="btn btn-primary column col-xs-12 col-4 col-ml-auto">Register</nuxt-link>
            </div>
          </div>
        </div>
      </form>
      <div v-if="error" class="toast toast-warning">
        {{ error }}
      </div>
    </div>
    <div v-if="updated" class="column col-xs-12 col-sm-10 col-md-6 col-lg-4 col-3 col-mx-auto">
      <h4>Vote Count</h4>
      <Chart :poll="poll" />
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import Chart from '~/components/chart'
export default {
  data () {
    return {
      poll: null,
      updated: false,
      error: null
    }
  },
  async asyncData ({ redirect, route, store }) {
    let poll = await axios.get(`/api/polls/${route.params.id}`).then(response => {
      if (response.status === 404) {
        return null
      }
      return response.data
    })
    if (poll) {
      return {
        poll
      }
    }
    redirect('/404')
  },
  methods: {
    handleAnswerSubmit (e) {
      e.preventDefault()
      const answerIndex = e.target.answer.value
      // Set error message if no option has been selected
      if (!answerIndex) {
        this.error = 'Please Select one of the options above'
        return
      }
      // Increment selected answer votes
      const updatedPoll = this.poll
      updatedPoll.answers[answerIndex].votes += 1
      axios({
        method: 'PUT',
        url: `/api/polls/${this.$route.params.id}`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(updatedPoll)
      }).then(response => {
        this.poll = response.data
        this.updated = true
      }).catch(err => {
        console.log(err)
      })
    }
  },
  components: {
    Chart
  }
}
</script>

<style lang="scss" scoped>
  form {
    margin: 10px 0;
    .form-group {
      label {
        border: 1px solid #dadada;
        border-radius: .1rem;
        display: flex;
        justify-content: space-between;
        padding: 10px;
        margin: 10px 0;
      }
      input[type="radio"] {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: #fff;
        border: 1px solid #5755d9;
        border-radius: 50%;
        box-sizing: border-box;
        padding: 5px;
        height: 20px;
        width: 20px;
        transition: border 0.2s linear,
                    background-color 0.2s linear;
        &:checked {
          background-color: #5755d9;
          border: 5px solid #fff;
        }
        &:focus {
          outline: none;
        }
      }
    }
    .login-buttons {
      a {
        margin-bottom: 10px;
      }
    }
  }
</style>
