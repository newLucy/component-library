<template>
  <div class="box">
    <header>
      <h3>{{title}}</h3>
    </header>
    <body class="box-content">
      <p>{{message}}</p>
    </body>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    duration: {
      type: Number,
      default: 2000
    }
  },
  mounted () {
    console.log(this)
    setTimeout(() => {
      this.remove()
    }, this.duration)
  }
}
</script>

<style>
  .box {
    position: fixed;
    width: 50%;
    margin-left: 25%;
    top: 16px;
    left: 0;
    text-align: center;
    pointer-events: none;
    background-color: #fff;
    border: grey 3px solid;
    box-sizing: border-box;
  }
  .box-content {
    width: 200px;
    margin: 10px auto;
    font-size: 14px;
    padding: 8px 16px;
    background: #fff;
    border-radius: 3px;
    margin-bottom: 8px;
  }
</style>
