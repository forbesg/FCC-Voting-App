<template>
  <div class="homepage">
  <section class="container home-banner text-center">
    <img src="~static/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      Voting App
    </h1>
  </section>
  <section class="feature">
    <div class="columns col-8 col-mx-auto">
      <div class="column col-xs-12 col-sm-12 col-md-12 col-4 text-center">
        <div class="icon-container"><i class="icon icon-plus"></i></div>
        <h4>Create</h4>
        <p>Create a new poll to share with the world. Invite others to vote on your poll and visualise the results in a Chart.</p>
      </div>
      <div class="column col-xs-12 col-sm-12 col-md-12 col-4 text-center">
        <div class="icon-container"><i class="icon icon-mail"></i></div>
        <h4>Manage</h4>
        <p>Access your polls from your account dashboard and add additional polls of delete your polls that are no longer required.</p>
      </div>
      <div class="column col-xs-12 col-sm-12 col-md-12 col-4 text-center">
        <div class="icon-container"><i class="icon icon-share"></i></div>
        <h4>Share</h4>
        <p>Easily share your poll by Email, in a tweet of post it to Facebook to get your friends and followers involved.</p>
      </div>
    </div>
  </section>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'Voting App'
    }
  }
}
</script>

<style lang="scss" scoped>
.home-banner {
  padding: 30px 0;
}
.feature {
  background-color: #beba90;
  color: #8b181d;
  font-size: 0.9em;
  margin-top: 30px;
  padding: 30px 0;
  .icon-container {
    background-color: #6bab90;
    display: inline-block;
    padding: 30px;
    border-radius: 50%;
    margin: 20px 0;
    i.icon {
      color: #AA1F33;
      font-size: 4em;
    }
  }
  h4 {
    color: #aa1f33;
  }
}

</style>
