<template>
  <div>
    <div class="input-group mb-2">
      <span class="input-group-text">第一枝节到负载距离</span>
      <input class="form-control" v-model="d1">
      <span class="input-group-text">&lambda;</span>
    </div>

    <div class="input-group">
      <span class="input-group-text">端接</span>
      <select class="form-select" v-model="terminationLoad">
        <option :value="'short'">短路</option>
        <option :value="'open'">开路</option>
      </select>
    </div>

    <div v-for="(item, idx) in answer" :key="idx">
      <label>解{{idx+1}}</label>
      <div class="input-group mb-2">
        <span class="input-group-text">第一枝节</span>
        <input class="form-control" :value="item.l1.toFixed(3)">
        <span class="input-group-text">&lambda;</span>
        <input class="form-control" :value="(3e11/frequency*item.l1).toFixed(3)">
        <span class="input-group-text">mm</span>
      </div>

      <div class="input-group mb-2">
        <span class="input-group-text">第二枝节</span>
        <input class="form-control" :value="item.l2.toFixed(3)">
        <span class="input-group-text">&lambda;</span>
        <input class="form-control" :value="(3e11/frequency*item.l2).toFixed(3)">
        <span class="input-group-text">mm</span>
      </div>

      <div class="input-group">
        <span class="input-group-text">第三枝节</span>
        <input class="form-control" :value="item.l3.toFixed(3)">
        <span class="input-group-text">&lambda;</span>
        <input class="form-control" :value="(3e11/frequency*item.l3).toFixed(3)">
        <span class="input-group-text">mm</span>
      </div>
    </div>
  </div>
</template>

<script>
import matches from '@/matches'

export default {
  name: 'trippleStubMatch',
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
      d1: 1,
      terminationLoad: 'short'
    }
  },
  computed: {
    answer () {
      const answer = matches.tripleStub(this.Rs, this.Xs, this.Rl, this.Xl, this.d1)
      return answer !== null ? answer[this.terminationLoad] : null
    }
  }
}
</script>

<style scoped>

</style>
