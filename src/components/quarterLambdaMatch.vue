<template>
  <div>
    <div class="input-group mb-2" v-if="answer!==null">
      <span class="input-group-text">额外加的传输线长度</span>
      <input class="form-control" disabled :value="answer.d.toFixed(3)">
      <span class="input-group-text">&lambda;</span>
      <input class="form-control" disabled :value="(3e11/frequency*answer.d).toFixed(3)">
      <span class="input-group-text">mm</span>
    </div>

    <div class="input-group" v-if="answer!==null">
      <span class="input-group-text">1/4波长线特性阻抗</span>
      <input class="form-control" disabled :value="renderComplex(answer.Z1)">
      <span class="input-group-text">&Omega;</span>
    </div>

    <div v-else>不适用</div>
  </div>
</template>

<script>
import matches from '@/matches'
export default {
  name: 'quarterLambdaMatch',
  props: {
    Rs: Number,
    Xs: Number,
    Rl: Number,
    Xl: Number,
    frequency: {
      default: 1e9,
      type: Number
    }
  },
  computed: {
    answer () {
      return matches.quarterLambda(this.Rs, this.Xs, this.Rl, this.Xl)
    }
  },
  methods: {
    renderComplex (c) {
      return `${c.re.toFixed(3)}` + (c.im !== 0 ? `${c.im > 0 ? '+' : ''}${c.im.toFixed(3)}j` : '')
    }
  }
}
</script>

<style scoped>

</style>
