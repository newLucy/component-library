<template>
  <div>
    <p>值：{{this.$store.state.count}}</p>
    <p>双倍值：{{$store.getters.doubleCount}}</p>
    <button @click="$store.dispatch('add')">dispatch加1</button>
    <button @click="$store.commit('add')">commit加1</button>
  </div>
</template>

<script>
export default {
  created () {
    setTimeout(() => {
      this.$store.dispatch('add')
    }, 1000)
  }
}
</script>
