<template>
  <div>
    <div class="input-group mb-2">
      <span class="input-group-text">目标Q值</span>
      <input class="form-control" v-model="targetQText">
    </div>

    <div class="input-group">
      <span class="input-group-text">连接方式</span>
      <select class="form-select" v-model="connectType">
        <option value="LowPass">低通</option>
        <option value="HighPass">高通</option>
      </select>
    </div>
    <img :src="imgPath" width="200">
    <div v-if="answer===null">不适用</div>
    <div v-else>
      <div v-if="connectType==='LowPass'">
        <div class="input-group mb-2">
          <span class="input-group-text" v-html="mathRender('L_1')"></span>
          <input class="form-control" disabled :value="answer.Ls.toFixed(3)">
          <span class="input-group-text">nH</span>
        </div>
        <div class="input-group mb-2">
          <span class="input-group-text" v-html="mathRender('C')"></span>
          <input class="form-control" disabled :value="answer.C.toFixed(3)">
          <span class="input-group-text">pF</span>
        </div>
        <div class="input-group">
          <span class="input-group-text" v-html="mathRender('L_2')"></span>
          <input class="form-control" disabled :value="answer.Ll.toFixed(3)">
          <span class="input-group-text">nH</span>
        </div>
      </div>

      <div v-else>
        <div class="input-group mb-2">
          <span class="input-group-text" v-html="mathRender('C_1')"></span>
          <input class="form-control" disabled :value="answer.Cs.toFixed(3)">
          <span class="input-group-text">pF</span>
        </div>
        <div class="input-group mb-2">
          <span class="input-group-text" v-html="mathRender('L')"></span>
          <input class="form-control" disabled :value="answer.L.toFixed(3)">
          <span class="input-group-text">nH</span>
        </div>
        <div class="input-group">
          <span class="input-group-text" v-html="mathRender('C_2')"></span>
          <input class="form-control" disabled :value="answer.Cl.toFixed(3)">
          <span class="input-group-text">pF</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import matches from '@/matches'
import katex from 'katex'
export default {
  name: 'TNetMatch',
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
      connectType: 'LowPass',
      targetQText: '3'
    }
  },
  computed: {
    targetQ () {
      return parseFloat(this.targetQText)
    },
    answer () {
      const answer = matches.TNet(this.Rs, this.Xs, this.Rl, this.Xl, this.frequency, this.targetQ)
      return answer !== null ? answer[this.connectType] : answer
    },
    imgPath () {
      return `static/LTPi/T${this.connectType === 'LowPass' ? 2 : 1}.png`
    }
  },
  methods: {
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
