<template>
  <div>
    <div class="input-group mb-2">
      <span class="input-group-text">端接</span>
      <select class="form-select" v-model="terminationLoad">
        <option :value="'short'">短路</option>
        <option :value="'open'">开路</option>
      </select>
    </div>

    <div class="input-group mb-2">
      <span class="input-group-text">第一枝节到负载距离<span v-html="mathRender('d_1')"></span></span>
      <input class="form-control" v-model="d1">
      <span class="input-group-text">&lambda;</span>
    </div>

    <div class="input-group">
      <span class="input-group-text">第二枝节到负载距离<span v-html="mathRender('d_2')"></span></span>
      <select class="form-select" v-model="kLambda">
        <option :value="1">1/8</option>
        <option :value="2">2/8</option>
        <option :value="3">3/8</option>
      </select>
      <span class="input-group-text">&lambda;</span>
    </div>

    <img :src="imgPath" width="200">

    <div v-for="(item,idx) in answer" :key="idx">
      <label>解{{idx+1}}</label>
      <div class="input-group mb-2">
        <span class="input-group-text">第一枝节长度</span>
        <input class="form-control" disabled :value="item.l1.toFixed(3)">
        <span class="input-group-text">&lambda;</span>
        <input class="form-control" disabled :value="(3e11/frequency*item.l1).toFixed(3)">
        <span class="input-group-text">mm</span>
      </div>

      <div class="input-group">
        <span class="input-group-text">第二枝节长度</span>
        <input class="form-control" disabled :value="item.l2.toFixed(3)">
        <span class="input-group-text">&lambda;</span>
        <input class="form-control" disabled :value="(3e11/frequency*item.l2).toFixed(3)">
        <span class="input-group-text">mm</span>
      </div>
    </div>

    <div v-if="answer===null">
      不适用
    </div>
  </div>
</template>

<script>
import matches from '@/matches'
import katex from 'katex'
export default {
  name: 'doubleStubMatch',
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
      kLambda: 1,
      terminationLoad: 'short'
    }
  },
  computed: {
    answer () {
      const answer = matches.doubleStub(this.Rs, this.Xs, this.Rl, this.Xl, parseFloat(this.d1), this.kLambda)
      return answer !== null ? answer[this.terminationLoad] : null
    },
    imgPath () {
      return `static/stub/double_${this.terminationLoad}.png`
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
