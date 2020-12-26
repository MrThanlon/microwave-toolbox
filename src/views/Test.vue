<template>
  <div>
    <button @click="btnCallback">+1s</button>
    <p>ZYF:{{zyfText}}</p>
  </div>
</template>

<script>
let zyf = 123
export default {
  name: 'Test',
  computed: {
    zyfText () {
      return zyf + 's'
    }
  },
  methods: {
    btnCallback () {
      zyf -= 1
      console.log(zyf)
    }
  }
}
</script>

<style scoped>
</style>
