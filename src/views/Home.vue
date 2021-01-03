<template>
  <div class="home">
    <main style="width: 100%;display: flex;flex-wrap: wrap">
      <div style="width: 50%">
        <smith style="border: black 1px solid" :r="zr" :x="zx"
               @v-mousemove="smithCursorCallback"
               :key="enableAdmittanceAxis+enableResistanceAxis"
               :enable-resistance-axis="enableResistanceAxis"
               :enable-admittance-axis="enableAdmittanceAxis"
               :enable-resistance-cursor="enableResistanceCursor"
               :enable-admittance-cursor="enableAdmittanceCursor"
        ></smith>
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
            <input type="checkbox" v-model="enableResistanceCursor">
            阻抗
            <span v-if="smithCursor!==null">
              &nbsp;Z={{renderComplex(smithCursor.Z[0].toFixed(3), smithCursor.Z[1].toFixed(3))}}
            </span>
          </label>
          <label>
            <input type="checkbox" v-model="enableAdmittanceCursor">
            导纳
            <span v-if="smithCursor!==null">
              &nbsp;G={{renderComplex(smithCursor.G[0].toFixed(3), smithCursor.G[1].toFixed(3))}}
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
          <div v-if="TNetAnswer!==null" class="d-flex flex-wrap">
            <div style="width: 50%">
              <label>
                Highpass
                <input type="radio" name="tnet-select" value="hp">
              </label>
              <p>Cs:{{TNetAnswer.HighPass.Cs.toFixed(3)}}&nbsp;pF</p>
              <p>Cl:{{TNetAnswer.HighPass.Cl.toFixed(3)}}&nbsp;pF</p>
              <p>L:{{TNetAnswer.HighPass.L.toFixed(3)}}&nbsp;nH</p>
            </div>
            <div style="width: 50%">
              <label>
                Lowpass
                <input type="radio" name="tnet-select" value="lp">
              </label>
              <p>Ls:{{TNetAnswer.LowPass.Ls.toFixed(3)}}&nbsp;nH</p>
              <p>Ll:{{TNetAnswer.LowPass.Ll.toFixed(3)}}&nbsp;nH</p>
              <p>C:{{TNetAnswer.LowPass.C.toFixed(3)}}&nbsp;pF</p>
            </div>
          </div>
          <div v-else>
            不适用
          </div>
        </div>
        <div style="width: 100%">
          <h4>PI型网络匹配</h4>
          <div v-if="PiNetAnswer!==null" class="d-flex flex-wrap">
            <div style="width: 50%">
              <label>
                Highpass
                <input type="radio" name="pinet-select" value="hp">
              </label>
              <p>Ls:{{PiNetAnswer.HighPass.Ls.toFixed(3)}}&nbsp;nH</p>
              <p>Ll:{{PiNetAnswer.HighPass.Ll.toFixed(3)}}&nbsp;nH</p>
              <p>C:{{PiNetAnswer.HighPass.C.toFixed(3)}}&nbsp;pF</p>
            </div>
            <div style="width: 50%">
              <label>
                Lowpass
                <input type="radio" name="pinet-select" value="lp">
              </label>
              <p>Cs:{{PiNetAnswer.LowPass.Cs.toFixed(3)}}&nbsp;pF</p>
              <p>Cl:{{PiNetAnswer.LowPass.Cl.toFixed(3)}}&nbsp;pF</p>
              <p>L:{{PiNetAnswer.LowPass.L.toFixed(3)}}&nbsp;nH</p>
            </div>
          </div>
          <div v-else>
            不适用
          </div>
        </div>
        <div class="row d-flex flex-wrap">
          <h4 class="row">单枝节网络匹配</h4>
          <div class="row d-flex flex-nowrap">
            <div class="half-width d-flex flex-wrap border justify-content-center align-content-start">
              <p class="row d-flex justify-content-center border">并联</p>
              <div class="row d-flex flex-nowrap" v-if="singleStubParallelAnswer!==null">
                <div class="half-width d-flex flex-wrap justify-content-center border">
                  <p class="row d-flex justify-content-center border">端接开路</p>
                  <div class="d-flex flex-nowrap row">
                    <div class="half-width border">
                      d={{singleStubParallelAnswer.d1.toFixed(3)}}&lambda;
                      L={{singleStubParallelAnswer.open.l1.toFixed(3)}}&lambda;
                    </div>
                    <div class="half-width border">
                      d={{singleStubParallelAnswer.d2.toFixed(3)}}&lambda;
                      L={{singleStubParallelAnswer.open.l2.toFixed(3)}}&lambda;
                    </div>
                  </div>
                </div>
                <div class="half-width d-flex flex-wrap justify-content-center border">
                  <p class="row d-flex justify-content-center border">端接短路</p>
                  <div class="d-flex flex-nowrap row">
                    <div class="half-width border">
                      d={{singleStubParallelAnswer.d1.toFixed(3)}}&lambda;
                      L={{singleStubParallelAnswer.short.l1.toFixed(3)}}&lambda;
                    </div>
                    <div class="half-width border">
                      d={{singleStubParallelAnswer.d2.toFixed(3)}}&lambda;
                      L={{singleStubParallelAnswer.short.l2.toFixed(3)}}&lambda;
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                不适用
              </div>
            </div>
            <div class="half-width d-flex flex-wrap border justify-content-center align-content-start">
              <p class="row d-flex justify-content-center border">串联</p>
              <div class="row d-flex flex-nowrap" v-if="singleStubSerialAnswer!==null">
                <div class="half-width d-flex flex-wrap justify-content-center border">
                  <p class="row d-flex justify-content-center border">端接开路</p>
                  <div class="d-flex flex-nowrap row">
                    <div class="half-width border">
                      d={{singleStubSerialAnswer.d1.toFixed(3)}}&lambda;
                      L={{singleStubSerialAnswer.open.l1.toFixed(3)}}&lambda;
                    </div>
                    <div class="half-width border">
                      d={{singleStubSerialAnswer.d2.toFixed(3)}}&lambda;
                      L={{singleStubSerialAnswer.open.l2.toFixed(3)}}&lambda;
                    </div>
                  </div>
                </div>
                <div class="half-width d-flex flex-wrap justify-content-center border">
                  <p class="row d-flex justify-content-center border">端接短路</p>
                  <div class="d-flex flex-nowrap row">
                    <div class="half-width border">
                      d={{singleStubSerialAnswer.d1.toFixed(3)}}&lambda;
                      L={{singleStubSerialAnswer.short.l1.toFixed(3)}}&lambda;
                    </div>
                    <div class="half-width border">
                      d={{singleStubSerialAnswer.d2.toFixed(3)}}&lambda;
                      L={{singleStubSerialAnswer.short.l2.toFixed(3)}}&lambda;
                    </div>
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
          <div class="row d-flex flex-nowrap">
            <div class="row d-flex flex-nowrap" v-if="doubleStubAnswer!==null">
              <div class="half-width d-flex flex-wrap justify-content-center border">
                <p class="row d-flex justify-content-center border">端接开路</p>
                <div class="d-flex flex-nowrap row">
                  <div class="half-width border">
                    L1:{{doubleStubAnswer.open[0].l1.toFixed(3)}}&lambda;
                    L2:{{doubleStubAnswer.open[0].l2.toFixed(3)}}&lambda;
                  </div>
                  <div class="half-width border">
                    L1:{{doubleStubAnswer.open[1].l1.toFixed(3)}}&lambda;
                    L2:{{doubleStubAnswer.open[1].l2.toFixed(3)}}&lambda;
                  </div>
                </div>
              </div>
              <div class="half-width d-flex flex-wrap justify-content-center border">
                <p class="row d-flex justify-content-center border">端接短路</p>
                <div class="d-flex flex-nowrap row">
                  <div class="half-width border">
                    L1:{{doubleStubAnswer.short[0].l1.toFixed(3)}}&lambda;
                    L2:{{doubleStubAnswer.short[0].l2.toFixed(3)}}&lambda;
                  </div>
                  <div class="half-width border">
                    L1:{{doubleStubAnswer.short[1].l1.toFixed(3)}}&lambda;
                    L2:{{doubleStubAnswer.short[1].l2.toFixed(3)}}&lambda;
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              不适用
            </div>
          </div>
        </div>

        <div class="row">
          <h4>三枝节网络匹配</h4>
          <div class="row d-flex flex-nowrap">
            <div class="row d-flex flex-nowrap" v-if="tripleStubAnswer!==null">
              <div class="half-width d-flex flex-wrap justify-content-center border">
                <p class="row d-flex justify-content-center border">端接开路</p>
                <div class="d-flex flex-nowrap row">
                  <div class="half-width border">
                    L1:{{tripleStubAnswer.open[0].l1.toFixed(3)}}&lambda;
                    L2:{{tripleStubAnswer.open[0].l2.toFixed(3)}}&lambda;
                    L3:{{tripleStubAnswer.open[0].l3.toFixed(3)}}&lambda;
                  </div>
                  <div class="half-width border">
                    L1:{{tripleStubAnswer.open[1].l1.toFixed(3)}}&lambda;
                    L2:{{tripleStubAnswer.open[1].l2.toFixed(3)}}&lambda;
                    L3:{{tripleStubAnswer.open[1].l3.toFixed(3)}}&lambda;
                  </div>
                </div>
              </div>
              <div class="half-width d-flex flex-wrap justify-content-center border">
                <p class="row d-flex justify-content-center border">端接短路</p>
                <div class="d-flex flex-nowrap row">
                  <div class="half-width border">
                    L1:{{tripleStubAnswer.short[0].l1.toFixed(3)}}&lambda;
                    L2:{{tripleStubAnswer.short[0].l2.toFixed(3)}}&lambda;
                    L3:{{tripleStubAnswer.short[0].l3.toFixed(3)}}&lambda;
                  </div>
                  <div class="half-width border">
                    L1:{{tripleStubAnswer.short[1].l1.toFixed(3)}}&lambda;
                    L2:{{tripleStubAnswer.short[1].l2.toFixed(3)}}&lambda;
                    L3:{{tripleStubAnswer.short[1].l3.toFixed(3)}}&lambda;
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              不适用
            </div>
          </div>
        </div>
      </aside>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import smith from '@/components/smith'
import complex from 'complex.js'

export default {
  name: 'Home',
  data () {
    return {
      RsText: '50',
      XsText: '0',
      RlText: '50',
      XlText: '0',
      frequencyText: '1e9',
      targetQText: '3',
      LNetSelect: null,
      LNetText: {
        LCLowPass: null,
        CLLowPass: null,
        LCHighPass: null,
        CLHighPass: null
      },
      TNetAnswer: null,
      PiNetAnswer: null,
      singleStubParallelAnswer: null,
      singleStubSerialAnswer: null,
      doubleStubAnswer: null,
      tripleStubAnswer: null,
      enableResistanceAxis: true,
      enableAdmittanceAxis: false,
      enableResistanceCursor: true,
      enableAdmittanceCursor: false,
      smithCursor: null
    }
  },
  computed: {
    Rs () { return parseFloat(this.RsText) },
    Xs () { return parseFloat(this.XsText) },
    Rl () { return parseFloat(this.RlText) },
    Xl () { return parseFloat(this.XlText) },
    targetQ () { return parseFloat(this.targetQText) },
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
      const Z = [(1 - x * x - y * y) / ((1 - x) * (1 - x) + y * y), 2 * y / ((1 - x) * (1 - x) + y * y)]
      const G = complex(1).div(complex(Z[0], Z[1]))
      this.smithCursor = { Z, G: [G.re, G.im] }
    },
    drawLNetPath () {
      console.debug(this.LNetSelect)
    },
    doMatch () {
      this.LNetText = this.LNet(this.Rs, this.Xs, this.Rl, this.Xl, this.frequency)
      this.TNetAnswer = this.TNet(this.Rs, this.Xs, this.Rl, this.Xl, this.frequency, this.targetQ)
      this.PiNetAnswer = this.PiNet(this.Rs, this.Xs, this.Rl, this.Xl, this.frequency, this.targetQ)
      this.singleStubParallelAnswer = this.singleStubParallel(this.Rl, this.Xl, this.Rs, this.Xs)
      this.singleStubSerialAnswer = this.singleStubSerial(this.Rl, this.Xl, this.Rs, this.Xs)
      // TODO: add d param
      this.doubleStubAnswer = this.doubleStub(this.Rl, this.Xl, this.Rs, this.Xs, 1 / 8)
      this.tripleStubAnswer = this.tripleStub(this.Rl, this.Xl, this.Rs, this.Xs, 1 / 8)
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
    TNet (Rs, Xs, Rl, Xl, f, Q = 0) {
      if (Q < 0) { return null }
      if (Q === 0 && Rl === Rs) {
        return {
          HighPass: {
            Cs: 0, Cl: 0, L: 0
          },
          LowPass: {
            Ls: 0, Ll: 0, C: 0
          }
        }
      }
      if (Q < Math.sqrt(Math.max(Rs, Rl) / Math.min(Rs, Rl) - 1)) {
        return null
      }
      const Rv = Math.min(Rs, Rl) * (Q * Q + 1)
      const omega = 2 * Math.PI * f
      // cs-l-cl t network matching
      let q = Math.sqrt(Rv / Rs - 1)
      let Cs = 1 / omega / Rs / q
      if (Xs !== 0) {
        if (Cs === (-1 / omega / Xs)) {
          Cs = Number.POSITIVE_INFINITY
        } else {
          Cs = Cs * (-1 / omega / Xs) / (Cs + 1 / omega / Xs)
        }
      }
      const Cst = Cs
      let Ls = Rv / omega / q
      q = Math.sqrt(Rv / Rl - 1) // start load matching
      let Cl = 1 / omega / Rl / q
      if (Xl !== 0) {
        if (Cl === (-1 / omega / Xs)) {
          Cl = Number.POSITIVE_INFINITY
        } else {
          Cl = Cl * (-1 / omega / Xs) / (Cl + 1 / omega / Xs)
        }
      }
      const Clt = Cl
      let Ll = Rv / omega / q
      const L = Ll * Ls / (Ll + Ls)
      q = Math.sqrt(Rv / Rs - 1) // start source matching
      Ls = q * Rs / omega - Xs / omega
      Cs = q / omega / Rv
      q = Math.sqrt(Rv / Rl - 1) // start load matching
      Ll = q * Rl / omega - Xl / omega
      Cl = q / omega / Rv
      const C = Cs + Cl
      return {
        HighPass: {
          Cs: Cst * 1e12, Cl: Clt * 1e12, L: L * 1e9
        },
        LowPass: {
          Ls: Ls * 1e9, Ll: Ll * 1e9, C: C * 1e12
        }
      }
    },
    PiNet (Rs, Xs, Rl, Xl, f, Q = 0) {
      if (Q < 0) { return null }
      if (Q === 0 && Rs === Rl) {
        return {
          HighPass: {
            Ls: 0, Ll: 0, C: 0
          },
          LowPass: {
            Cs: 0, Cl: 0, L: 0
          }
        }
      }
      if (Q < Math.sqrt(Math.max(Rs, Rl) / Math.min(Rs, Rl) - 1)) {
        return null
      }
      const Rv = Math.max(Rs, Rl) / (Q * Q + 1)
      const omega = 2 * Math.PI * f
      const Qs = -Xs / Rs // find parallel circuits
      const Ql = -Xl / Rl
      const Rps = Rs * (1 + Qs * Qs)
      const Rpl = Rl * (1 + Ql * Ql)
      // cs-l-cl pi network matching
      const Cps = Qs / Rps / omega
      const Cpl = Ql / Rpl / omega
      let q = Math.sqrt(Rps / Rv - 1) // start source matching
      let Cs = q / omega / Rps - Cps
      const Cst = Cs
      let Ls = q * Rv / omega
      q = Math.sqrt(Rpl / Rv - 1) // start load matching
      let Cl = q / omega / Rpl - Cpl
      const Clt = Cl
      let Ll = q * Rv / omega
      const L = Ls + Ll
      q = Math.sqrt(Rps / Rv - 1) // start source matching
      Ls = Rps / omega / q
      if (Qs !== 0) {
        const Lps = Rps / Qs / omega
        Ls = Ls * Lps / (Ls - Lps)
      }
      Cs = 1 / omega / q / Rv
      q = Math.sqrt(Rpl / Rv - 1) // start load matching
      Ll = Rpl / omega / q
      if (Ql !== 0) {
        const Lpl = Rpl / Ql / omega
        Ll = Ll * Lpl / (Ll - Lpl)
      }
      Cl = 1 / omega / q / Rv
      const C = Cl * Cs / (Cl + Cs)
      return {
        HighPass: {
          Ls: Ls * 1e9, Ll: Ll * 1e9, C: C * 1e12
        },
        LowPass: {
          Cs: Cst * 1e12, Cl: Clt * 1e12, L: L * 1e9
        }
      }
    },
    singleStubParallel (Rl, Xl, Rs, Xs) {
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
    singleStubSerial (Rl, Xl, Rs, Xs) {
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
    },
    doubleStub (Rl, Xl, Rs, Xs, d, kLambda = 1) {
      const zL = complex(Rl, Xl)
      const z0 = complex(Rs, Xs)
      const gammaL = (zL.sub(z0)).div(zL.add(z0))
      const gammaLAbs = gammaL.abs() // real number
      const gammaLAngle = gammaL.arg() // real number
      const gamma11 = complex({ abs: gammaLAbs, arg: gammaLAngle - 4 * Math.PI * d })
      const y11 = complex(1).sub(gamma11).div(complex(1).add(gamma11))
      const G1 = y11.re
      const B1 = y11.im
      // check blind zone
      if (kLambda === 2) {
        if (G1 >= 1) {
          //
          return null
        }
      } else {
        if (G1 >= 2) {
          return null
        }
      }
      const Ga = G1
      let Ba1, Ba2, B31, B32
      if (kLambda === 1) {
        Ba1 = 1 + Math.sqrt(Ga * (2 - Ga))
        Ba2 = 1 - Math.sqrt(Ga * (2 - Ga))
        B31 = (1 - Ba1 ** 2 - Ga ** 2) / ((1 - Ba1) ** 2 + Ga ** 2)
        B32 = (1 - Ba2 ** 2 - Ga ** 2) / ((1 - Ba2) ** 2 + Ga ** 2)
      } else if (kLambda === 2) {
        Ba1 = Math.sqrt(Ga * (1 - Ga))
        Ba2 = -Math.sqrt(Ga * (1 - Ga))
        B31 = -Ba1 / (Ga ^ 2 + Ba1 ** 2)
        B32 = -Ba2 / (Ga ^ 2 + Ba2 ** 2)
      } else if (kLambda === 3) {
        Ba1 = -1 + Math.sqrt(Ga * (2 - Ga))
        Ba2 = -1 - Math.sqrt(Ga * (2 - Ga))
        B31 = (-1 + Ba1 ** 2 + Ga ** 2) / ((1 + Ba1) ** 2 + Ga ** 2)
        B32 = (-1 + Ba2 ** 2 + Ga ** 2) / ((1 + Ba2) ** 2 + Ga ** 2)
      } else {
        return null
      }
      const B21 = Ba1 - B1
      const B22 = Ba2 - B1
      const B41 = -B31
      const B42 = -B32
      // acot(x) <=> atan(1/x)
      const acot = x => Math.atan(1 / x)
      const shiftToPositive = x => x > 0 ? x : x + 0.5
      const LA1SH = shiftToPositive(acot(-B21) / (2 * Math.PI))
      const LB1SH = shiftToPositive(acot(-B22) / (2 * Math.PI))
      const LA2SH = shiftToPositive(acot(-B41) / (2 * Math.PI))
      const LB2SH = shiftToPositive(acot(-B42) / (2 * Math.PI))
      const shiftToPostive2 = x => x >= 0.25 ? x - 0.25 : x + 0.25
      const LA1OP = shiftToPostive2(LA1SH)
      const LB1OP = shiftToPostive2(LB1SH)
      const LA2OP = shiftToPostive2(LA2SH)
      const LB2OP = shiftToPostive2(LB2SH)
      return {
        open: [{ l1: LA1OP, l2: LA2OP }, { l1: LB1OP, l2: LB2OP }],
        short: [{ l1: LA1SH, l2: LA2SH }, { l1: LB1SH, l2: LB2SH }]
      }
    },
    tripleStub (Rl, Xl, Rs, Xs, d) {
      // same as above
      const zL = complex(Rl, Xl)
      const z0 = complex(Rs, Xs)
      const gammaL = (zL.sub(z0)).div(zL.add(z0))
      const gammaLAbs = gammaL.abs() // real number
      const gammaLAngle = gammaL.arg() // real number
      const gamma11 = complex({ abs: gammaLAbs, arg: gammaLAngle - 4 * Math.PI * d })
      const y11 = complex(1).sub(gamma11).div(complex(1).add(gamma11))
      const G1 = y11.re
      // const B1 = y11.im // unused
      let LA1SH, LA2SH, LA3SH
      let LB1SH, LB2SH, LB3SH
      if (G1 >= 1) {
        LA1SH = 0.25
        LB1SH = 0.25
        const tmp = this.doubleStub(Rl, Xl, Rs, Xs, d + 0.25, 2)
        if (tmp === null) {
          return null
        }
        LA2SH = tmp.short[0].l1
        LA3SH = tmp.short[0].l2
        LB2SH = tmp.short[1].l1
        LB3SH = tmp.short[1].l2
      } else {
        LA3SH = 0.25
        LB3SH = 0.25
        const tmp = this.doubleStub(Rl, Xl, Rs, Xs, d + 0.25, 2)
        if (tmp === null) {
          return null
        }
        LA1SH = tmp.short[0].l1
        LA2SH = tmp.short[0].l2
        LB1SH = tmp.short[1].l1
        LB2SH = tmp.short[1].l2
      }
      const shiftToPostive2 = x => x >= 0.25 ? x - 0.25 : x + 0.25
      const LA1OP = shiftToPostive2(LA1SH)
      const LA2OP = shiftToPostive2(LA2SH)
      const LA3OP = shiftToPostive2(LA3SH)
      const LB1OP = shiftToPostive2(LB1SH)
      const LB2OP = shiftToPostive2(LB2SH)
      const LB3OP = shiftToPostive2(LB3SH)
      return {
        open: [
          { l1: LA1OP, l2: LA2OP, l3: LA3OP },
          { l1: LB1OP, l2: LB2OP, l3: LB3OP }
        ],
        short: [
          { l1: LA1SH, l2: LA2SH, l3: LA3SH },
          { l1: LB1SH, l2: LB2SH, l3: LB3SH }
        ]
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
