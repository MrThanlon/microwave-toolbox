<template>
  <div class="d-flex flex-wrap">
    <div class="col-12 col-md-6 mb-2 p-0 mb-md-0 p-md-2">
      <div class="card shadow">
        <h5 class="card-header">参数输入</h5>
        <div class="card-body d-flex flex-wrap">
          <div class="input-group mb-2"
               v-for="item in parameterInput"
               :key="item.text">
            <span class="input-group-text">{{item.text}}</span>
            <input class="form-control" v-model="parameterValue[item.name]">
            <span class="input-group-text"
                  v-if="item.unit!==null"
                  v-html="item.unit"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-6 mb-2 p-0 mb-md-0 p-md-2">
      <div class="card shadow">
        <h5 class="card-header">匹配结果</h5>
        <div class="card-body d-flex flex-wrap">
          <div class="input-group mb-2">
            <span class="input-group-text">匹配方式</span>
            <select class="form-select" v-model="matchMethod">
              <option v-for="item in matchMethods"
                      :key="item.text"
                      :value="item.component">
                {{item.text}}
              </option>
            </select>
          </div>
          <keep-alive>
            <component
              class="w-100"
              :is="matchMethod"
              :frequency="parseFloat(parameterValue.frequency)"
              :Rs="parseFloat(parameterValue.Rs)"
              :Xs="parseFloat(parameterValue.Xs)"
              :Rl="parseFloat(parameterValue.Rl)"
              :Xl="parseFloat(parameterValue.Xl)">
            </component>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LNetMatch from '@/components/LNetMatch'
export default {
  name: 'Match',
  data () {
    return {
      smithLength: 600,
      parameterInput: [
        {
          text: '频率',
          name: 'frequency',
          unit: 'Hz'
        },
        {
          text: '源电阻',
          name: 'Rs',
          unit: '&Omega;'
        },
        {
          text: '源电抗',
          name: 'Xs',
          unit: '&Omega;'
        },
        {
          text: '负载电阻',
          name: 'Rl',
          unit: '&Omega;'
        },
        {
          text: '负载电抗',
          name: 'Xl',
          unit: '&Omega;'
        }/* ,
        {
          text: '相对介电常数',
          name: 'epsilon',
          unit: null
        },
        {
          text: '相对磁导率',
          name: 'mu',
          unit: null
        } */
      ],
      parameterValue: {
        frequency: '1e9',
        Rs: 50,
        Xs: 0,
        Rl: 50,
        Xl: 0,
        epsilon: 1,
        mu: 1
      },
      matchMethods: [
        {
          text: 'L型网络匹配',
          component: LNetMatch
        },
        {
          text: 'T型网络匹配',
          component: () => import('@/components/TNetMatch')
        },
        {
          text: 'Pi型网络匹配',
          component: () => import('@/components/PiNetMatch')
        },
        {
          text: '单枝节网络匹配',
          component: () => import('@/components/singleStubMatch')
        },
        {
          text: '双枝节网络匹配',
          component: () => import('@/components/doubleStubMatch')
        },
        {
          text: '三枝节网络匹配',
          component: () => import('@/components/tripleStubMatch')
        },
        {
          text: '四分之一波长变换器',
          component: () => import('@/components/quarterLambdaMatch')
        }
      ],
      matchMethod: LNetMatch,
      TNetAnswer: null,
      PiNetAnswer: null,
      singleStubParallelAnswer: null,
      singleStubSerialAnswer: null,
      doubleStubAnswer: null,
      tripleStubAnswer: null
    }
  },
  mounted () {
    if (document.body.clientWidth < 600) {
      this.smithLength = document.body.clientWidth
    }
  }
}
</script>

<style scoped>

</style>
