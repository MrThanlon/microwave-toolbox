<template>
  <div>
    <img src="static/quarterLambda.png" class="m-2" height="130">
    <div class="input-group mb-2" v-if="answer!==null">
      <span class="input-group-text">额外加的传输线长度<span v-html="mathRender('d')"></span></span>
      <input class="form-control" disabled :value="answer.d.toFixed(3)">
      <span class="input-group-text">&lambda;</span>
      <input class="form-control" disabled :value="(3e11/frequency*answer.d).toFixed(3)">
      <span class="input-group-text">mm</span>
    </div>

    <div class="input-group" v-if="answer!==null">
      <span class="input-group-text">
        ¼波长线特性阻抗
        <span v-html="mathRender('Z_1')"></span>
      </span>
      <input class="form-control" disabled :value="renderComplex(answer.Z1)">
      <span class="input-group-text">&Omega;</span>
    </div>

    <div v-else>不适用</div>
  </div>
</template>

<script>
import matches from '@/matches'
import katex from 'katex'
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
    },
    mathRender (s) {
      return katex.renderToString(s, {
        throwOnError: false
      })
    }
  }
}
</script>

<style scoped>

</style>
