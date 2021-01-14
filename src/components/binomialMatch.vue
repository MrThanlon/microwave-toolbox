<template>
  <div>
    <div class="input-group mb-2">
      <span class="input-group-text">
        反射系数
        <span v-html="mathRender('\\Gamma_m')"></span>
      </span>
      <input class="form-control" v-model="gammaM">
    </div>

    <div class="input-group mb-2">
      <span class="input-group-text">
        匹配节数
        <span v-html="mathRender('N')"></span>
      </span>
      <input class="form-control" v-model="N">
    </div>

    <div>
      <button class="btn btn-outline-dark mb-2" @click="doMatch">开始计算</button>
    </div>

    <div v-if="Rs===Rl&&Xs===-Xl">已匹配</div>
    <div v-else>
      <div v-if="answer===null">不适用</div>
      <div v-else>
        <div class="input-group mb-2" v-for="(item, idx) in answer.Z" :key="idx">
          <span class="input-group-text" v-html="mathRender(`Z_{${idx+1}}`)"></span>
          <input class="form-control" disabled :value="renderComplex(item)">
        </div>
        <div class="input-group mb-2">
          <span class="input-group-text">相对带宽</span>
          <input class="form-control" disabled :value="answer.fM.toFixed(3)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import katex from 'katex'
// eslint-disable-next-line import/no-webpack-loader-syntax
import worker from 'workerize-loader!../binomial'
export default {
  name: 'binomialMatch',
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
  data () {
    return {
      gammaM: 0.05,
      N: 5,
      answer: null,
      instance: null,
      resolving: false
    }
  },
  mounted () {
    this.instance = worker()
  },
  methods: {
    async doMatch () {
      if (this.resolving) {
        // TODO: cancel
        return
      }
      const N = parseInt(this.N)
      if (!Number.isInteger(N)) {
        // tell the user N must be integer
        return
      }
      this.resolving = true
      this.answer = await this.instance.binomial(this.Rs, this.Xs, this.Rl, this.Xl, parseFloat(this.gammaM), N)
      this.resolving = false
    },
    mathRender (s) {
      return katex.renderToString(s, {
        throwOnError: false
      })
    },
    renderComplex (c) {
      if (isFinite(c.re) && isFinite(c.im)) {
        return `${c.re.toFixed(3)}` + (c.im !== 0 ? `${c.im > 0 ? '+' : ''}${c.im.toFixed(3)}j` : '')
      } else {
        return '无效'
      }
    }
  }
}
</script>

<style scoped>

</style>
