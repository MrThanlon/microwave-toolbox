<template>
  <div>
    <div v-if="Rs===Rl&&Xs===-Xl">已匹配</div>
    <div v-else>
      <div class="input-group">
        <span class="input-group-text">连接方式</span>
        <select class="form-select" v-model="connectType">
          <option value="LCLP">L-C低通</option>
          <option value="LCHP">L-C高通</option>
          <option value="CLLP">C-L低通</option>
          <option value="CLHP">C-L高通</option>
        </select>
      </div>
      <img :src="imgPath" width="200" height="200">
      <div class="input-group mb-2" v-if="answer!==null">
        <span class="input-group-text">L</span>
        <input class="form-control" disabled :value="answer.L.toFixed(3)">
        <span class="input-group-text">nH</span>
      </div>

      <div class="input-group mb-2" v-if="answer!==null">
        <span class="input-group-text">C</span>
        <input class="form-control" disabled :value="answer.C.toFixed(3)">
        <span class="input-group-text">pF</span>
      </div>

      <div class="input-group" v-if="answer!==null">
        <span class="input-group-text">Q</span>
        <input class="form-control" disabled :value="answer.Q.toFixed(3)">
      </div>
      <div v-else>不适用</div>
    </div>
  </div>
</template>

<script>
import matches from '@/matches'
export default {
  name: 'LNetMatch',
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
      connectType: 'LCLP'
    }
  },
  computed: {
    answer () {
      return matches[this.connectType](this.Rs, this.Xs, this.Rl, this.Xl, this.frequency)
    },
    imgPath () {
      const imgMap = { LCLP: 3, LCHP: 1, CLLP: 2, CLHP: 4 }
      return `/static/LTPi/L${imgMap[this.connectType]}.jpg`
    }
  }
}
</script>

<style scoped>

</style>
