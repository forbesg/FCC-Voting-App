<template>
    <div class="share-poll">
        <div class="divider text-center" data-content="Share Your Poll"></div>
        <div class="share-buttons">
            <a class="btn btn-primary tooltip"
            data-tooltip="Share by Email"
            :href="`mailto:?subject=Check%20Out%20This%20Poll&body=Have%20a%20look%20at%20this%20poll%20-%20${pollUrl}`">
            <i class="icon icon-mail"></i>
            </a>
            <a class="btn btn-primary tooltip"
            data-tooltip="Share on Twitter"
            target="_blank"
            :href="`https://twitter.com/intent/tweet?text=Check%20Out%20This%20Poll&body=Have%20a%20look%20at%20this%20poll%20-%20${pollUrl}&url=${pollUrl}`">
            <i class="fa fa-twitter"></i>
            </a>
            <a class="btn btn-primary tooltip"
            data-tooltip="Share on Facebook"
            target="_blank"
            :href="`https://www.facebook.com/sharer/sharer.php?u=${pollUrl}`">
            <i class="fa fa-facebook"></i>
            </a>
        </div>
    </div>
</template>

<script>
export default {
  name: 'fg-share',
  props: ['pollUrl']
}
</script>

<style lang="scss" scoped>
.share-buttons {
    a {
      margin: 10px;
      i {
        width: 16px;
        height: 16px;
      }
    }
  }
</style>


