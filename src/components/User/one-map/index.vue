<template>
  <iframe v-if="$store.state.ONE_MAP"
          :src="$store.state.ONE_MAP"
          frameborder="0"
          class="one-map-detail">
  </iframe>
</template>

<style lang="scss" scoped>
.one-map-detail {
  width: 100%;
  height: calc(100vh - 0.7rem);
}
</style>
