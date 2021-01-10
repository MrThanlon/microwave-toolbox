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
    <img :src="imgPath" width="200" height="200">
    <div v-if="connectType==='HighPass'">
      <div class="input-group mb-2">
        <span class="input-group-text">L1</span>
        <input class="form-control" disabled :value="answer.Ls.toFixed(3)">
        <span class="input-group-text">nH</span>
      </div>
      <div class="input-group mb-2">
        <span class="input-group-text">C</span>
        <input class="form-control" disabled :value="answer.C.toFixed(3)">
        <span class="input-group-text">pF</span>
      </div>
      <div class="input-group">
        <span class="input-group-text">L2</span>
        <input class="form-control" disabled :value="answer.Ll.toFixed(3)">
        <span class="input-group-text">nH</span>
      </div>
    </div>

    <div v-else>
      <div class="input-group mb-2">
        <span class="input-group-text">C1</span>
        <input class="form-control" disabled :value="answer.Cs.toFixed(3)">
        <span class="input-group-text">pF</span>
      </div>
      <div class="input-group mb-2">
        <span class="input-group-text">L</span>
        <input class="form-control" disabled :value="answer.L.toFixed(3)">
        <span class="input-group-text">nH</span>
      </div>
      <div class="input-group">
        <span class="input-group-text">C2</span>
        <input class="form-control" disabled :value="answer.Cl.toFixed(3)">
        <span class="input-group-text">pF</span>
      </div>
    </div>
  </div>
</template>

<script>
import matches from '@/matches'
export default {
  name: 'PiNetMatch',
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
      return matches.PiNet(this.Rs, this.Xs, this.Rl, this.Xl, this.frequency, this.targetQ)[this.connectType]
    },
    imgPath () {
      return `/static/LTPi/Pi${this.connectType === 'LowPass' ? 1 : 2}.jpg`
    }
  }
}
</script>

<style scoped>

</style>
