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
      <select class="form-select" v-model="N">
        <option v-for="item in [1,2,3,4]" :value="item" :key="item">{{item}}</option>
      </select>
    </div>
    <div v-if="Rs===Rl&&Xs===-Xl">已匹配</div>
    <div v-else>
      <div v-if="answer===null">不适用</div>
      <div v-else>
        <div class="input-group mb-2" v-for="(item, idx) in answer.Z" :key="item">
          <span class="input-group-text" v-html="mathRender(`Z_${idx+1}`)"></span>
          <input class="form-control" disabled :value="renderComplex(item)">
          <span class="input-group-text">&Omega;</span>
        </div>
        <div class="input-group">
          <span class="input-group-text">相对带宽</span>
          <input class="form-control" disabled :value="answer.fM.toFixed(3)">
          <span class="input-group-text">Hz</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import matches from '@/matches'
import katex from 'katex'
export default {
  name: 'chebyshevMatch',
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
      N: 3
    }
  },
  computed: {
    answer () {
      return matches.chebyshev(this.Rs, this.Xs, this.Rl, this.Xl, this.gammaM, this.N)
    }
  },
  methods: {
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
