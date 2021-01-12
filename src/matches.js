import complex from 'complex.js'

export default {
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
      if (isFinite(L) && isFinite(C) && isFinite(Q) && L > 0 && C > 0) {
        return {
          L,
          C,
          Q: Math.abs(Q)
        }
      } else {
        return null
      }
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
      if (isFinite(L) && isFinite(C) && isFinite(Q) && L > 0 && C > 0) {
        return {
          L,
          C,
          Q: Math.abs(Q)
        }
      } else {
        return null
      }
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
    if (Q < 0) {
      return null
    }
    if (Q === 0 && Rl === Rs) {
      return {
        HighPass: {
          Cs: 0,
          Cl: 0,
          L: 0
        },
        LowPass: {
          Ls: 0,
          Ll: 0,
          C: 0
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
        Cs: Cst * 1e12,
        Cl: Clt * 1e12,
        L: L * 1e9
      },
      LowPass: {
        Ls: Ls * 1e9,
        Ll: Ll * 1e9,
        C: C * 1e12
      }
    }
  },
  PiNet (Rs, Xs, Rl, Xl, f, Q = 0) {
    if (Q < 0) {
      return null
    }
    if (Q === 0 && Rs === Rl) {
      return {
        HighPass: {
          Ls: 0,
          Ll: 0,
          C: 0
        },
        LowPass: {
          Cs: 0,
          Cl: 0,
          L: 0
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
        Ls: Ls * 1e9,
        Ll: Ll * 1e9,
        C: C * 1e12
      },
      LowPass: {
        Cs: Cst * 1e12,
        Cl: Clt * 1e12,
        L: L * 1e9
      }
    }
  },
  singleStubParallel (Rs, Xs, Rl, Xl) {
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
  singleStubSerial (Rs, Xs, Rl, Xl) {
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
  shiftToPositive: x => x > 0 ? x : x + 0.5,
  shiftToPositive2: x => x >= 0.25 ? x - 0.25 : x + 0.25,
  doubleStub (Rs, Xs, Rl, Xl, d, kLambda = 1) {
    const zL = complex(Rl, Xl)
    const z0 = complex(Rs, Xs)
    const gammaL = (zL.sub(z0)).div(zL.add(z0))
    const gammaLAbs = gammaL.abs() // real number
    const gammaLAngle = gammaL.arg() // real number
    const gamma11 = complex({
      abs: gammaLAbs,
      arg: gammaLAngle - 4 * Math.PI * d
    })
    const y11 = complex(1).sub(gamma11).div(complex(1).add(gamma11))
    const G1 = y11.re
    const B1 = y11.im
    // check blind zone
    if (kLambda === 2) {
      if (G1 > 1) {
        //
        return null
      }
    } else {
      if (G1 > 2) {
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
    const LA1SH = this.shiftToPositive(acot(-B21) / (2 * Math.PI))
    const LB1SH = this.shiftToPositive(acot(-B22) / (2 * Math.PI))
    const LA2SH = this.shiftToPositive(acot(-B41) / (2 * Math.PI))
    const LB2SH = this.shiftToPositive(acot(-B42) / (2 * Math.PI))
    const LA1OP = this.shiftToPositive2(LA1SH)
    const LB1OP = this.shiftToPositive2(LB1SH)
    const LA2OP = this.shiftToPositive2(LA2SH)
    const LB2OP = this.shiftToPositive2(LB2SH)
    return {
      open: [{
        l1: LA1OP,
        l2: LA2OP
      }, {
        l1: LB1OP,
        l2: LB2OP
      }],
      short: [{
        l1: LA1SH,
        l2: LA2SH
      }, {
        l1: LB1SH,
        l2: LB2SH
      }]
    }
  },
  tripleStub (Rs, Xs, Rl, Xl, d) {
    if (Rl === Rs && Xl === 0 && Xs === 0) {
      return {
        open: [{ l1: 0, l2: 0, l3: 0 },
          { l1: 0, l2: 0, l3: 0 }
        ],
        short: [{ l1: 0.25, l2: 0.25, l3: 0.25 },
          { l1: 0.25, l2: 0.25, l3: 0.25 }
        ]
      }
    }
    // same as above
    const zL = complex(Rl, Xl)
    const z0 = complex(Rs, Xs)
    const gammaL = (zL.sub(z0)).div(zL.add(z0))
    const gammaLAbs = gammaL.abs() // real number
    const gammaLAngle = gammaL.arg() // real number
    const gamma11 = complex({
      abs: gammaLAbs,
      arg: gammaLAngle - 4 * Math.PI * d
    })
    const y11 = complex(1).sub(gamma11).div(complex(1).add(gamma11))
    const G1 = y11.re
    // const B1 = y11.im // unused
    let LA1SH, LA2SH, LA3SH
    let LB1SH, LB2SH, LB3SH
    if (G1 > 1) {
      LA1SH = 0.25
      LB1SH = 0.25
      const tmp = this.doubleStub(Rs, Xs, Rl, Xl, d + 0.25, 2)
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
      const tmp = this.doubleStub(Rs, Xs, Rl, Xl, d, 2)
      if (tmp === null) {
        return null
      }
      LA1SH = tmp.short[0].l1
      LA2SH = tmp.short[0].l2
      LB1SH = tmp.short[1].l1
      LB2SH = tmp.short[1].l2
    }
    const LA1OP = this.shiftToPositive2(LA1SH)
    const LA2OP = this.shiftToPositive2(LA2SH)
    const LA3OP = this.shiftToPositive2(LA3SH)
    const LB1OP = this.shiftToPositive2(LB1SH)
    const LB2OP = this.shiftToPositive2(LB2SH)
    const LB3OP = this.shiftToPositive2(LB3SH)
    return {
      open: [{ l1: LA1OP, l2: LA2OP, l3: LA3OP },
        { l1: LB1OP, l2: LB2OP, l3: LB3OP }
      ],
      short: [{ l1: LA1SH, l2: LA2SH, l3: LA3SH },
        { l1: LB1SH, l2: LB2SH, l3: LB3SH }
      ]
    }
  },
  quarterLambda (Rs, Xs, Rl, Xl) {
    const Zl = complex(Rl, Xl)
    const Zs = complex(Rs, Xs)
    const gammaL = Zl.sub(Zs).div(Zl.add(Zs))
    const gammaLAbs = gammaL.abs()
    const gammaLAngle = gammaL.arg()
    let distance
    let gammaIn
    if (gammaLAngle >= 0 && gammaLAngle < Math.PI) {
      distance = gammaLAngle / (4 * Math.PI)
      gammaIn = gammaL.abs()
    } else if (-Math.PI < gammaLAngle && gammaLAngle < 0) {
      distance = (gammaLAngle + Math.PI) / (4 * Math.PI)
      gammaIn = -gammaL.abs()
    } else if (gammaLAngle === Math.PI) {
      distance = 0
      gammaIn = -gammaLAbs
    } else {
      return null
    }
    const Zin = Zs.mul((1 + gammaIn) / (1 - gammaIn))
    const Z1 = Zin.mul(Zs).sqrt()
    return {
      Z1,
      d: distance
    }
  },
  asec (x) {
    return Math.acos(1 / x)
  },
  chebyshev (Rs, Xs, Rl, Xl, gammaM, N = 1) {
    if (N > 4) {
      return null
    }
    const Zl = complex(Rl, Xl)
    const Zs = complex(Rs, Xs)
    const thetaM = this.asec(Math.cosh(1 / N * (Math.acosh(Zl.div(Zs).log().div(2 * gammaM).abs()))))
    const fM = 2 - 4 * thetaM / Math.PI
    const gamma = Array(N)
    const Z = Array(N)
    if (N === 1) {
      gamma[0] = gammaM * 1 / Math.cos(gammaM) / 2
      Z[0] = Zs.log().add(2 * gamma[0]).exp()
    } else if (N === 2) {
      gamma[0] = gammaM * 1 / Math.cos(thetaM) ** 2 / 2
      gamma[1] = gammaM * (1 / Math.cos(thetaM) ** 2 - 1)
      Z[0] = Zs.log().add(2 * gamma[0]).exp()
      Z[1] = Z[0].log().add(2 * gamma[1]).exp()
    } else if (N === 3) {
      gamma[0] = gammaM * 1 / Math.cos(thetaM) ** 3 / 2
      gamma[1] = gammaM * 3 * (1 / Math.cos(thetaM) ** 3 - 1 / Math.cos(thetaM)) / 2
      gamma[2] = gamma[1]
      Z[0] = Zs.log().add(2 * gamma[0]).exp()
      Z[1] = Z[0].log().add(2 * gamma[1]).exp()
      Z[2] = Z[1].log().add(2 * gamma[2]).exp()
    } else if (N === 4) {
      gamma[0] = gammaM * 1 / Math.cos(thetaM) ** 4 / 2
      gamma[1] = gammaM * 2 * (1 / Math.cos(thetaM) ** 4 - 1 / Math.cos(thetaM) ** 2)
      gamma[2] = gammaM * (3 / Math.cos(thetaM) ** 4 - 4 / Math.cos(thetaM) ** 2 + 1)
      gamma[3] = gamma[1]
      Z[0] = Zs.log().add(2 * gamma[0]).exp()
      Z[1] = Z[0].log().add(2 * gamma[1]).exp()
      Z[2] = Z[1].log().add(2 * gamma[2]).exp()
      Z[3] = Z[2].log().add(2 * gamma[3]).exp()
    } else {
      return null
    }
    return { thetaM, fM, Z }
  }
}
