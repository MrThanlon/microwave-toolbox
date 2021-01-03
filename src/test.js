const complex = require('complex.js')

function doubleStub (Rl, Xl, Rs, Xs, d, kLambda = 1) {
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
}

function tripleStub (Rl, Xl, Rs, Xs, d) {
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
    const tmp = doubleStub(Rl, Xl, Rs, Xs, d + 0.25, 2)
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
    const tmp = doubleStub(Rl, Xl, Rs, Xs, d + 0.25, 2)
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

console.debug(tripleStub(50, 0, 50, 0, 1 / 8))