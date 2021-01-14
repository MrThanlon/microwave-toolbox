<template>
  <div>
  </div>
</template>

<script>
import complex from 'complex.js'
// eslint-disable-next-line import/no-webpack-loader-syntax
import worker from 'workerize-loader!../test'
export default {
  name: 'Test',
  mounted () {
    console.debug(complex.toString())
    const instance = worker()
    instance.forever()
  }
}
</script>

<style scoped>
</style>
