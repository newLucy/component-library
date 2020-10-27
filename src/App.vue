<template>
  <div id="app">
    <qrouter-link to="/tree">tree</qrouter-link>
    <qrouter-link to="/form">form</qrouter-link>
    <qrouter-link to="/vuex">vuex</qrouter-link>
    <qrouter-link to="/router">router</qrouter-link>
    <qrouter-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
