<template>
  <div class="grey darken-1 empty-layout">
<<<<<<< HEAD
    <router-view />
  </div>
</template>
=======
    <router-view/>
  </div>
</template>
<script>
import messages from '@/utils/messages'
export default {
  computed: {
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    error (fbError) {
      console.log(fbError)
      this.$error(messages[fbError.code] || 'Что то пошло не так')
    }
  }
}
</script>
>>>>>>> aeb516a (login register v2)
