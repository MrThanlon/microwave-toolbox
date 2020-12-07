<template>
  <div class="home">
    <main style="width: 100%;display: flex;flex-wrap: wrap">
      <div style="width: 50%">
        <smith style="border: black 1px solid" :r="zr" :x="zx"
               @v-mousemove="smithCursorCallback"
               :key="enableAdmittanceAxis+enableResistanceAxis"
               :enable-resistance-axis="enableResistanceAxis"
               :enable-admittance-axis="enableAdmittanceAxis"></smith>
      </div>
      <aside style="width: 50%;display: flex;flex-wrap: wrap;text-align: start;align-content: start">
        <div style="width: 100%">
          <h4>坐标系</h4>
          <label>
            <input type="checkbox" v-model="enableResistanceAxis">
            实轴
          </label>
          <label>
            <input type="checkbox" v-model="enableAdmittanceAxis">
            虚轴
          </label>
          <label>
            <input type="checkbox" checked>
            阻抗
            <span v-if="smithCursor!==null">
              &nbsp;Z={{renderComplex(smithCursor.Z[0].toFixed(3), smithCursor.Z[1].toFixed(3))}}
            </span>
          </label>
          <label>
            <input type="checkbox" checked>
            导纳
            <span v-if="smithCursor!==null">
              &nbsp;G={{renderComplex(smithCursor.G[0], smithCursor.G[1])}}
            </span>
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
        <div class="row d-flex flex-wrap">
          <h4 class="row">单枝节网络匹配</h4>
          <div class="row d-flex flex-nowrap">
            <div class="half-width d-flex flex-wrap border justify-content-center align-content-start">
              <p class="row d-flex justify-content-center border">并联</p>
              <div class="row d-flex flex-nowrap" v-if="oneStubParallelAnswer!==null">
                <div class="half-width d-flex flex-wrap justify-content-center border">
                  <p class="row d-flex justify-content-center">端接开路</p>
                  <div>
                    d1={{oneStubParallelAnswer.d1.toFixed(3)}}&lambda;
                    d2={{oneStubParallelAnswer.d2.toFixed(3)}}&lambda;
                    L1={{oneStubParallelAnswer.open.l1.toFixed(3)}}&lambda;
                    L2={{oneStubParallelAnswer.open.l2.toFixed(3)}}&lambda;
                  </div>
                </div>
                <div class="half-width d-flex flex-wrap justify-content-center border">
                  <p class="row d-flex justify-content-center">端接短路</p>
                  <div>
                    d1={{oneStubParallelAnswer.d1.toFixed(3)}}&lambda;
                    d2={{oneStubParallelAnswer.d2.toFixed(3)}}&lambda;
                    L1={{oneStubParallelAnswer.short.l1.toFixed(3)}}&lambda;
                    L2={{oneStubParallelAnswer.short.l2.toFixed(3)}}&lambda;
                  </div>
                </div>
              </div>
              <div v-else>
                不适用
              </div>
            </div>
            <div class="half-width d-flex flex-wrap border justify-content-center align-content-start">
              <p class="row d-flex justify-content-center border">串联</p>
              <div class="row d-flex flex-nowrap" v-if="oneStubSerialAnswer!==null">
                <div class="half-width d-flex flex-wrap justify-content-center border">
                  <p class="row d-flex justify-content-center">端接开路</p>
                  <div>
                    d1={{oneStubSerialAnswer.d1.toFixed(3)}}&lambda;
                    d2={{oneStubSerialAnswer.d2.toFixed(3)}}&lambda;
                    L1={{oneStubSerialAnswer.open.l1.toFixed(3)}}&lambda;
                    L2={{oneStubSerialAnswer.open.l2.toFixed(3)}}&lambda;
                  </div>
                </div>
                <div class="half-width d-flex flex-wrap justify-content-center border">
                  <p class="row d-flex justify-content-center">端接短路</p>
                  <div>
                    d1={{oneStubSerialAnswer.d1.toFixed(3)}}&lambda;
                    d2={{oneStubSerialAnswer.d2.toFixed(3)}}&lambda;
                    L1={{oneStubSerialAnswer.short.l1.toFixed(3)}}&lambda;
                    L2={{oneStubSerialAnswer.short.l2.toFixed(3)}}&lambda;
                  </div>
                </div>
              </div>
              <div v-else>
                不适用
              </div>
            </div>
          </div>
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
      oneStubParallelAnswer: null,
      oneStubSerialAnswer: null,
      enableResistanceAxis: true,
      enableAdmittanceAxis: false,
      smithCursor: null
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
    callback (e) {
      console.debug(e)
    },
    renderComplex (r, x) {
      return `${r}${x >= 0 ? '+' : ''}${x}j`
    },
    smithCursorCallback ({ x, y }) {
      if (x === null) {
        // move out
        this.smithCursor = null
        return
      }
      this.smithCursor = {
        Z: [(1 - x * x - y * y) / ((1 - x) * (1 - x) + y * y), 2 * y / ((1 - x) * (1 - x) + y * y)],
        G: [1, 0]
      }
    },
    drawLNetPath () {
      console.debug(this.LNetSelect)
    },
    doMatch () {
      this.LNetText = this.LNet(this.Rs, this.Xs, this.Rl, this.Xl, this.frequency)
      this.oneStubParallelAnswer = this.oneStubParallel(this.Rl, this.Xl, this.Rs, this.Xs)
      this.oneStubSerialAnswer = this.oneStubSerial(this.Rl, this.Xl, this.Rs, this.Xs)
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
    },
    oneStubParallel (Rl, Xl, Rs, Xs) {
      if (Xs !== 0) {
        return null
      }
      let t1
      let t2
      if (Rl === Rs) {
        t1 = t2 = -Xl / Rl
      } else {
        t1 = (Xl + Math.sqrt(Rl * ((Rs - Rl) ** 2 + Xl ** 2) / Rs)) / (Rl - Rs)
        t2 = (Xl - Math.sqrt(Rl * ((Rs - Rl) ** 2 + Xl ** 2) / Rs)) / (Rl - Rs)
      }
      const B1 = (Rl ** 2 * t1 - (Rs - Xl * t1) * (Xl + Rs * t1)) / (Rs * (Rl ** 2 + (Xl + Rs * t1) ** 2))
      const B2 = (Rl ** 2 * t2 - (Rs - Xl * t2) * (Xl + Rs * t2)) / (Rs * (Rl ** 2 + (Xl + Rs * t2) ** 2))
      const Ys = 1 / Rs
      const lo1 = -Math.atan(B1 / Ys) / (2 * Math.PI)
      const lo2 = -Math.atan(B2 / Ys) / (2 * Math.PI)
      const ls1 = Math.atan(Ys / B1) / (2 * Math.PI)
      const ls2 = Math.atan(Ys / B2) / (2 * Math.PI)
      return {
        d1: (t1 >= 0 ? Math.atan(t1) : (Math.PI + Math.atan(t1))) / (2 * Math.PI),
        d2: (t2 >= 0 ? Math.atan(t2) : (Math.PI + Math.atan(t2))) / (2 * Math.PI),
        open: {
          l1: lo1 >= 0 ? lo1 : lo1 + 0.5,
          l2: lo2 >= 0 ? lo2 : lo2 + 0.5
        },
        short: {
          l1: ls1 >= 0 ? ls1 : ls1 + 0.5,
          l2: ls2 >= 0 ? ls2 : ls2 + 0.5
        }
      }
    },
    oneStubSerial (Rl, Xl, Rs, Xs) {
      if (Xs !== 0) {
        return null
      }
      // transmit to admittance
      const Gl = Rl / (Rl ** 2 + Xl ** 2)
      const Bl = -Xl / (Rl ** 2 + Xl ** 2)
      const Y0 = 1 / Rs
      let t1
      let t2
      if (Gl === Y0) {
        t1 = t2 = -Bl / (2 * Y0)
      } else {
        t1 = (Bl + Math.sqrt(Gl * ((Y0 - Gl) ** 2 + Bl ** 2) / Y0)) / (Gl - Y0)
        t2 = (Bl - Math.sqrt(Gl * ((Y0 - Gl) ** 2 + Bl ** 2) / Y0)) / (Gl - Y0)
      }
      const X1 = (Gl ** 2 * t1 - (Y0 - t1 * Bl) * (Bl + t1 * Y0)) / (Y0 * (Gl ** 2 + (Bl + Y0 * t1) ** 2))
      const X2 = (Gl ** 2 * t2 - (Y0 - t2 * Bl) * (Bl + t2 * Y0)) / (Y0 * (Gl ** 2 + (Bl + Y0 * t2) ** 2))
      const lo1 = Math.atan(Rs / X1) / (2 * Math.PI)
      const lo2 = Math.atan(Rs / X2) / (2 * Math.PI)
      const ls1 = -Math.atan(X1 / Rs) / (2 * Math.PI)
      const ls2 = -Math.atan(X2 / Rs) / (2 * Math.PI)
      return {
        d1: (t1 >= 0 ? Math.atan(t1) : Math.atan(t1) + Math.PI) / (2 * Math.PI),
        d2: (t2 >= 0 ? Math.atan(t2) : Math.atan(t2) + Math.PI) / (2 * Math.PI),
        open: {
          l1: lo1 >= 0 ? lo1 : lo1 + 0.5,
          l2: lo2 >= 0 ? lo2 : lo2 + 0.5
        },
        short: {
          l1: ls1 >= 0 ? ls1 : ls1 + 0.5,
          l2: ls2 >= 0 ? ls2 : ls2 + 0.5
        }
      }
    }
  }
}
</script>
<style scoped>
  .row {
    width: 100%;
  }
  .half-width {
    width: 50%;
  }
  .d-flex {
    display: flex;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .flex-nowrap {
    flex-wrap: nowrap;
  }
  .border {
    border: black 1px solid;
  }
  .justify-content-center {
    justify-content: center;
  }
  .align-content-start {
    align-content: start;
  }
  p {
    margin: 0;
  }
  h4 {
    margin: 0;
  }
</style>
