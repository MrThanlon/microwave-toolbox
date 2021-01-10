<template>
  <div>
    <div v-if="Rs===Rl&&Xs===-Xl">已匹配</div>
    <div v-else>
      <div class="input-group mb-2">
        <span class="input-group-text">连接方式</span>
        <select class="form-select" v-model="connectType">
          <option :value="'parallel'">并联支路</option>
          <option :value="'serial'">串联支路</option>
        </select>
      </div>

      <div class="input-group mb-2">
        <span class="input-group-text">端接</span>
        <select class="form-select" v-model="terminationLoad">
          <option :value="'short'">短路</option>
          <option :value="'open'">开路</option>
        </select>
      </div>

      <div v-if="answer!==null">
        <label>解1</label>
        <div class="input-group mb-2">
          <span class="input-group-text">枝节距离</span>
          <input class=form-control disabled :value="distance1Lambda.toFixed(3)">
          <span class="input-group-text">&lambda;</span>
          <input class="form-control" disabled :value="distance1Millimeter.toFixed(3)">
          <span class="input-group-text">mm</span>
        </div>

        <div class="input-group mb-2">
          <span class="input-group-text">枝节长度</span>
          <input class=form-control disabled :value="length1Lambda.toFixed(3)">
          <span class="input-group-text">&lambda;</span>
          <input class="form-control" disabled :value="length1Millimeter.toFixed(3)">
          <span class="input-group-text">mm</span>
        </div>
      </div>

      <div v-if="answer!==null">
        <label>解2</label>
        <div class="input-group mb-2">
          <span class="input-group-text">枝节距离</span>
          <input class=form-control disabled :value="distance2Lambda.toFixed(3)">
          <span class="input-group-text">&lambda;</span>
          <input class="form-control" disabled :value="distance2Millimeter.toFixed(3)">
          <span class="input-group-text">mm</span>
        </div>

        <div class="input-group mb-2">
          <span class="input-group-text">枝节长度</span>
          <input class=form-control disabled :value="length2Lambda.toFixed(3)">
          <span class="input-group-text">&lambda;</span>
          <input class="form-control" disabled :value="length2Millimeter.toFixed(3)">
          <span class="input-group-text">mm</span>
        </div>
      </div>
      <div v-else>不适用</div>
    </div>
  </div>
</template>

<script>
// import { singleStubParallel, singleStubSerial } from '@/matches'
import matches from '@/matches'

export default {
  name: 'singleStubMatch',
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
      connectType: 'parallel',
      terminationLoad: 'short'
    }
  },
  computed: {
    answer () {
      return this.connectType === 'parallel' ? matches.singleStubParallel(this.Rs, this.Xs, this.Rl, this.Xl) : matches.singleStubSerial(this.Rs, this.Xs, this.Rl, this.Xl)
    },
    distance1Lambda () {
      return this.answer.d1
    },
    distance2Lambda () {
      return this.answer.d2
    },
    length1Lambda () {
      return this.answer[this.terminationLoad].l1
    },
    length2Lambda () {
      return this.answer[this.terminationLoad].l2
    },
    // FIXME: 不应该使用真空光速
    distance1Millimeter () {
      return 3e11 / this.frequency * this.distance1Lambda
    },
    distance2Millimeter () {
      return 3e11 / this.frequency * this.distance2Lambda
    },
    length1Millimeter () {
      return 3e11 / this.frequency * this.length1Lambda
    },
    length2Millimeter () {
      return 3e11 / this.frequency * this.length2Lambda
    }
  }
}
</script>

<style scoped>

</style>
