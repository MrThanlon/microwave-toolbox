<template>
  <div class="home">
    <main style="width: 100%;display: flex;flex-wrap: wrap">
      <div style="width: 50%">
        <smith style="border: black 1px solid" :r="zr" :x="zx"
               :key="enableAdmittanceAxis+enableResistanceAxis"
               :enable-resistance-axis="enableResistanceAxis"
               :enable-admittance-axis="enableAdmittanceAxis"></smith>
      </div>
      <aside style="width: 50%;display: flex;flex-wrap: wrap;text-align: start;align-content: start">
        <div style="width: 100%">
          <h4>坐标系</h4>
          <label>
            实轴
            <input type="checkbox" v-model="enableResistanceAxis">
          </label>
          <label>
            虚轴
            <input type="checkbox" v-model="enableAdmittanceAxis">
          </label>
        </div>
        <div style="width: 100%">
          <h4>参数输入</h4>
          <label>
            频率
            <input v-model="frequencyText" @input="doMatch">
          </label>
          <label>
            源电阻
            <input v-model="RsText" @input="doMatch">
          </label>
          <label>
            源电抗
            <input v-model="XsText" @input="doMatch">
          </label>
          <label>
            负载电阻
            <input v-model="RlText" @input="doMatch">
          </label>
          <label>
            负载电抗
            <input v-model="XlText" @input="doMatch">
          </label>
          <label>
            目标Q值
            <input v-model="targetQText" @input="doMatch">
          </label>
          <p>归一化z={{zText}}</p>
        </div>
        <div style="width: 100%;display: flex;flex-wrap: wrap">
          <h4 style="width: 100%">L型网络匹配</h4>
          <div style="width: 25%" v-if="LNetText.CLLowPass!==null">
            <label>
              CL-Lowpass
              <input type="radio" name="lnet-select" value="CLLP" v-model="LNetSelect" @change="drawLNetPath">
            </label>
            <p>L:{{LNetText.CLLowPass.L.toFixed(3)}}&nbsp;nH</p>
            <p>C:{{LNetText.CLLowPass.C.toFixed(3)}}&nbsp;pF</p>
            <p>Q:{{LNetText.CLLowPass.Q.toFixed(3)}}</p>
          </div>
          <div style="width: 25%" v-if="LNetText.LCLowPass!==null">
            <label>
              LC-Lowpass
              <input type="radio" name="lnet-select" value="LCLP" v-model="LNetSelect" @change="drawLNetPath">
            </label>
            <p>L:{{LNetText.LCLowPass.L.toFixed(3)}}&nbsp;nH</p>
            <p>C:{{LNetText.LCLowPass.C.toFixed(3)}}&nbsp;pF</p>
            <p>Q:{{LNetText.LCLowPass.Q.toFixed(3)}}</p>
          </div>
          <div style="width: 25%" v-if="LNetText.LCHighPass!==null">
            <label>
              LC-Highpass
              <input type="radio" name="lnet-select" value="LCHP" v-model="LNetSelect" @change="drawLNetPath">
            </label>
            <p>L:{{LNetText.LCHighPass.L.toFixed(3)}}&nbsp;nH</p>
            <p>C:{{LNetText.LCHighPass.C.toFixed(3)}}&nbsp;pF</p>
            <p>Q:{{LNetText.LCHighPass.Q.toFixed(3)}}</p>
          </div>
          <div style="width: 25%" v-if="LNetText.CLHighPass!==null">
            <label>
              CL-Highpass
              <input type="radio" name="lnet-select" value="CLHP" v-model="LNetSelect" @change="drawLNetPath">
            </label>
            <p>L:{{LNetText.CLHighPass.L.toFixed(3)}}&nbsp;nH</p>
            <p>C:{{LNetText.CLHighPass.C.toFixed(3)}}&nbsp;pF</p>
            <p>Q:{{LNetText.CLHighPass.Q.toFixed(3)}}</p>
          </div>
        </div>
        <div style="width: 100%">
          <h4>T型网络匹配</h4>
        </div>
        <div style="width: 100%">
          <h4>PI型网络匹配</h4>
        </div>
        <div style="width: 100%">
          <h4>单枝节网络匹配</h4>
        </div>
        <div style="width: 100%">
          <h4>双枝节网络匹配</h4>
        </div>
      </aside>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import smith from '@/components/smith'

export default {
  name: 'Home',
  data () {
    return {
      RsText: '50',
      XsText: '0',
      RlText: '50',
      XlText: '0',
      frequencyText: '1e9',
      targetQText: '',
      LNetSelect: null,
      LNetText: {
        LCLowPass: null,
        CLLowPass: null,
        LCHighPass: null,
        CLHighPass: null
      },
      enableResistanceAxis: true,
      enableAdmittanceAxis: false
    }
  },
  computed: {
    Rs () { return parseFloat(this.RsText) },
    Xs () { return parseFloat(this.XsText) },
    Rl () { return parseFloat(this.RlText) },
    Xl () { return parseFloat(this.XlText) },
    frequency () { return parseFloat(this.frequencyText) },
    zr () {
      return (this.Rl * this.Rs + this.Xl * this.Xs) / (this.Rs * this.Rs + this.Xs * this.Xs)
    },
    zx () {
      return (this.Xl * this.Rs - this.Rl * this.Xs) / (this.Rs * this.Rs + this.Xs * this.Xs)
    },
    zText () {
      if (isFinite(this.zr) && isFinite(this.zx)) {
        return `${this.zr}${this.zx >= 0 ? '+' : ''}${this.zx}j`
      } else {
        return 'Invalid'
      }
    }
  },
  mounted () {
    this.doMatch()
  },
  components: {
    smith
  },
  methods: {
    drawLNetPath () {
      console.debug(this.LNetSelect)
    },
    doMatch () {
      this.LNetText = this.LNet(this.Rs, this.Xs, this.Rl, this.Xl, this.frequency)
    },
    LCLP (Rs, Xs, Rl, Xl, f) {
      return this.CLLP(Rl, Xl, Rs, Xs, f)
    },
    CLLP (Rs, Xs, Rl, Xl, f) {
      const omega = 2 * Math.PI * f
      const Qs = -Xs / Rs
      const Rp = Rs * (1 + Qs * Qs)
      const C1 = Qs / Rp / omega
      const L1 = Xl / omega
      if (Rl > Rp) {
        return null
      } else {
        const Q = Math.sqrt(Rp / Rl - 1)
        const Cp = Q / Rp / omega
        const C = (Cp - C1) * 1e12
        const Ls = Q * Rl / omega
        const L = (Ls - L1) * 1e9
        return { L, C, Q }
      }
    },
    LCHP (Rs, Xs, Rl, Xl, f) {
      const omega = 2 * Math.PI * f
      const Qs = Xs / Rs
      const C1 = -1 / omega / Xl
      const L1 = (1 + Qs * Qs) * Xs / omega / Qs / Qs
      const Rp = (1 + Qs * Qs) * Rs
      Rs = Rl
      if (Rs > Rp) {
        return null
      } else {
        const Q = Math.sqrt(Rp / Rs - 1)
        const Lp = Rp / omega / Q
        const Cs = 1 / Q / omega / Rs
        let C
        if (Xl === 0) {
          C = Cs * 1e12
        } else {
          if (C1 === Cs) {
            C = Number.POSITIVE_INFINITY
          } else {
            C = C1 * Cs / (C1 - Cs) * 1e12
          }
        }
        let L
        if (Xs === 0) {
          L = Lp * 1e9
        } else {
          if (L1 === Lp) {
            L = Number.POSITIVE_INFINITY
          } else {
            L = Lp * L1 / (L1 - Lp) * 1e9
          }
        }
        return { L, C, Q: Math.abs(Q) }
      }
    },
    CLHP (Rs, Xs, Rl, Xl, f) {
      return this.LCHP(Rl, Xl, Rs, Xs, f)
    },
    LNet (Rs, Xs, Rl, Xl, f) {
      return {
        LCLowPass: this.LCLP(Rs, Xs, Rl, Xl, f),
        CLLowPass: this.CLLP(Rs, Xs, Rl, Xl, f),
        LCHighPass: this.LCHP(Rs, Xs, Rl, Xl, f),
        CLHighPass: this.CLHP(Rs, Xs, Rl, Xl, f)
      }
    }
  }
}
</script>
<style scoped>
  p {
    margin: 0;
  }
  h4 {
    margin: 0;
  }
</style>
