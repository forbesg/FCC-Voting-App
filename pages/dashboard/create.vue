<template lang="html">
  <div class="container">
    <header class="column col-xs-12 col-sm-10 col-md-8 col-4 col-mx-auto">
      <h2>{{ !pollUrl ? 'Create New Poll' : 'Congratulations' }}</h2>
    </header>
    <div class="form-container column col-xs-12 col-sm-10 col-md-8 col-4 col-mx-auto">
      <form class="form form-horizontal create-poll" @submit="handleFormSubmit" v-if="!pollUrl">
        <header class="columns">
          <h6>Poll Question</h6>
        </header>
        <div class="form-group columns">
          <label for="question" class="form-label">Question: </label>
          <input class="form-input" type="text" name="question" v-model="question" value="">
        </div>
        <div class="divider"></div>
        <header class="columns">
          <h6>Poll Answers</h6>
          <button class="btn btn-primary tooltip" data-tooltip="Add Answer" @click="addAnswer"><i class="icon icon-plus"></i></button>
        </header>
        <transition-group name="list" tag="div">
          <div class="form-group columns" v-for="answer, index in answers" :key="index">
            <label :for="'option' + index" class="form-label col-12">Answer {{ index + 1 }}:</label>
            <input class="form-input column col-12" type="text" :name="'option' + index" v-model="answers[index]" value="">
            <div class="clear-button" v-if="answers.length > 2">
              <span class="btn btn-clear float-right tooltip" data-tooltip="Remove Answer" @click="() => {removeAnswer(index)}"></span>
            </div>
          </div>
        </transition-group>
        <div class="form-group columns mt-2">
          <input class="btn btn-default" type="submit" value="Add Poll">
        </div>
      </form>
      <div class="toast toast-warning" v-if="error">
        {{error}}
      </div>
      <div class="confirmation" v-if="pollUrl">
        <div class="divider"></div>
        <p>
          Your Poll has been posted to <a :href="pollUrl" target="_blank">{{ pollUrl }}</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      question: '',
      answers: ['', ''],
      error: null,
      pollUrl: null
    }
  },
  methods: {
    addAnswer (e) {
      e.preventDefault()
      this.answers.push('')
    },
    removeAnswer (index) {
      this.answers.splice(index, 1)
    },
    handleFormSubmit (e) {
      e.preventDefault()
      if (this.question === '' || this.answers.length < 2 || this.answers.includes('')) {
        this.error = 'Please complete all required fields'
        return
      }
      this.error = null
      let question = {
        owner: {
          name: this.$store.state.user.name,
          email: this.$store.state.user.email
        },
        question: this.question,
        answers: this.answers
      }
      /**
        Submit Form Data to API
      **/
      axios({
        method: 'POST',
        url: '/api/polls/add',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(question)
      }).then(response => {
        if (response.status === 201) {
          this.addPoll(response.data)
          this.pollUrl = `${this.$root._context.env.baseUrl}/polls/${response.data._id}`
        }
      }).catch(err => {
        console.log(err)
      })

      // fetch('/api/polls/add', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(question)
      // }).then(response => {
      //   if (response.status === 200) {
      //     return response.json()
      //   }
      // }).then(json => {
      //   this.addPoll(json)
      //   this.pollUrl = 'http://localhost:3000/polls/' + json._id + ''
      // }).catch(err => {
      //   console.log('Error', err)
      // })
    },
    ...mapMutations({
      addPoll: 'ADD_POLL'
    })
  }
}
</script>

<style lang="scss">
  form {
    text-align: left;
    header {
      display: flex;
      justify-content: space-between;
      margin: 20px 0 10px 0;
      h6 {
        color: #444;
      }
    }
  }
  .form-group {
    position: relative;
    .clear-button {
      position: absolute;
      right: 0px;
      .btn-clear {
        margin: 8px 0;
      }
    }
  }

  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active, .list-leave-active {
    transition: all 0.5s;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

</style>
