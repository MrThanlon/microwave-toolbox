import complex from 'complex.js'

const factorial = n => {
  let ans = 1
  while (n > 0) {
    ans *= n
    n -= 1
  }
  return ans
}

const nchoosek = (n, k) => {
  return factorial(n) / (factorial(k) * factorial(n - k))
}

export function binomial (Rs, Xs, Rl, Xl, gammaM, N = 1) {
  const Zs = complex(Rs, Xs)
  const Zl = complex(Rl, Xl)
  const A = Zl.sub(Zs).div(Zl.add(Zs)).mul(2 ** (-N))
  const fM = 2 - (4 / Math.PI) * (Math.acos(1 / 2 * (gammaM / A.abs()) ** (1 / N)))
  let Zi = Zs
  const Z = Array(N).fill(0).map((v, idx) => {
    Zi = Zi.log().add(Zl.div(Zs).log().mul(2 ** (-N) * nchoosek(N, idx))).exp()
    return Zi.clone()
  })
  return {
    A, fM, Z
  }
}
