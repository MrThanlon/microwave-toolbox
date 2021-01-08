<template>
  <div>
    <div class="input-group">
      <span class="input-group-text">连接方式</span>
      <select class="form-select" v-model="connectType">
        <option value="LCLP">L-C低通</option>
        <option value="LCHP">L-C高通</option>
        <option value="CLLP">C-L低通</option>
        <option value="CLHP">C-L高通</option>
      </select>
    </div>
    <!--TODO: show image -->
    <span>这里缺少连接方式的图片</span>
    <div class="input-group mb-2">
      <span class="input-group-text">L</span>
      <input class="form-control" disabled :value="answer.L.toFixed(3)">
      <span class="input-group-text">nH</span>
    </div>

    <div class="input-group mb-2">
      <span class="input-group-text">C</span>
      <input class="form-control" disabled :value="answer.C.toFixed(3)">
      <span class="input-group-text">pF</span>
    </div>

    <div class="input-group">
      <span class="input-group-text">Q</span>
      <input class="form-control" disabled :value="answer.Q.toFixed(3)">
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
    }
  }
}
</script>

<style scoped>

</style>
