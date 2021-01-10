<template>
  <div>
    <span ref="math"></span>
  </div>
</template>

<script>
import katex from 'katex'
export default {
  name: 'Test',
  data () {
    return {
      renderString: ''
    }
  },
  mounted () {
    katex.render('c = \\pm\\sqrt{a^2 + b^2}', this.$refs.math, {
      throwOnError: false
    })
  }
}
</script>

<style scoped>
</style>
