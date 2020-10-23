<template>
  <div>
    <p>值：{{this.$store.state.count}}</p>
    <!-- <p>双倍值：{{doubleCount}}</p> -->
    <button @click="handleAdd"></button>
  </div>
</template>

<script>
export default {
  computed: {
    doubleCount () {
      return this.$store.getters.doubleCount
    }
  },
  methods: {
    handleAdd () {
      this.$store.dispatch('add')
    }
  }
}
</script>
