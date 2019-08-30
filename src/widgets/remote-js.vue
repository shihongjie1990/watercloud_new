<template>
  <remote-js :src="this.src"></remote-js>
</template>

<script>
export default {
  props: {
    src: { type: String, required: true }

  },
  components: {
    'remote-js': {
      render(createElement) {
        return createElement('script', {
          attrs: {
            type: 'text/javascript',
            src: this.src
          }
        })
      }
    }
  }
}
</script>
