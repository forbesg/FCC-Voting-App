<template lang="html">
  <table class="table table-striped table-hover">
    <tbody>
      <tr v-for="poll in polls || $store.state.polls">
        <td>
          <nuxt-link :to="{ path:'/polls/' + poll._id }">{{ poll.question }}</nuxt-link>
        </td>
        <td>
          {{ poll.owner.name }}
        </td>
        <td>
          <button  v-if="owner" class="btn btn-primary tooltip tooltip-left" data-tooltip="Delete Poll" @click="() => {handleDelete(poll._id)}"><i class="icon icon-delete"></i></button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'FGTable',
  props: ['polls', 'owner', 'handleDelete']
}
</script>

<style lang="scss">
  table {
    margin: 10px 0;
  }
</style>
