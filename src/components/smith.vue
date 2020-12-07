<template>
  <svg :width="length" :height="length" ref="svg" id="svg"
       @click="clickCallback"
       @mousemove="moveCallback"
       @mouseout="$emit('v-mousemove', {x:null,y:null})"
       @mousedown="mousedown=true"
       @mouseup="mousedown=false">
  </svg>
</template>

<script>
export default {
  name: 'smith',
  props: {
    length: {
      type: Number,
      default: 600
    },
    r: {
      type: Number,
      default: null
    },
    x: {
      type: Number,
      default: null
    },
    enableResistanceAxis: {
      type: Boolean,
      default: true
    },
    enableAdmittanceAxis: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      realCircle: null,
      imageCircle: null,
      mousedown: false
    }
  },
  computed: {
    lengthUnit () {
      return this.length / 2
    }
  },
  methods: {
    callback (e) {
      console.debug(e)
    },
    drawLNetPath (type = 'LCLP') {
      if (type === 'LCLP' || type === 'CLHP') {
      } else {
      }
    },
    createRealAdmittanceCircle (Gl, stroke = 'black') {
      const radius = 1 / (1 + Gl)
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.classList.add('axis')
      circle.style.stroke = stroke
      circle.cx.baseVal.value = radius * this.lengthUnit
      circle.cy.baseVal.value = this.length / 2
      circle.r.baseVal.value = radius * this.lengthUnit
      return circle
    },
    createImageAdmittanceCircleCmd (Sl) {
      if (Sl === 0) {
        // cant draw rad, use line
        return `M${this.length} ${this.lengthUnit} L0 ${this.length / 2}`
      } else {
        const radius = 1 / Sl
        const endX = 2 - 2 * radius * radius / (radius * radius + 1)
        const endY = -2 * radius / (radius * radius + 1)
        console.debug(endX, endY)
        return `M0 ${this.length / 2}
          A${radius * this.lengthUnit} ${radius * this.lengthUnit} 0 0 ${Sl > 0 ? 1 : 0}
          ${this.length - endX * this.lengthUnit} ${this.length / 2 - endY * this.lengthUnit}`
      }
    },
    createImageAdmittanceCircle (Sl, stroke = 'black') {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.classList.add('axis')
      path.style.stroke = stroke
      const d = document.createAttribute('d')
      d.nodeValue = this.createImageAdmittanceCircleCmd(Sl)
      path.attributes.setNamedItem(d)
      return path
    },
    drawRealCircle (rl) {
      if (this.realCircle === null) {
        this.realCircle = this.createRealCircle(rl, 'red')
        this.$refs.svg.appendChild(this.realCircle)
      } else {
        const radius = 1 / (1 + rl)
        this.realCircle.cx.baseVal.value = this.length - radius * this.lengthUnit
        this.realCircle.r.baseVal.value = radius * this.lengthUnit
      }
    },
    drawImageCircle (xl) {
      if (this.imageCircle === null) {
        this.imageCircle = this.createImageCircle(xl, 'red')
        this.$refs.svg.appendChild(this.imageCircle)
      } else {
        // modify
        this.imageCircle.attributes.d.nodeValue = this.createImageCircleCmd(xl)
      }
    },
    clickCallback (e) {
      if (e.target !== this.$refs.svg) {
        return
      }
      const x = e.offsetX / this.lengthUnit - 1
      const y = 1 - e.offsetY / this.lengthUnit
      const rl = (1 - x * x - y * y) / ((1 - x) * (1 - x) + y * y)
      const xl = 2 * y / ((1 - x) * (1 - x) + y * y)
      this.drawRealCircle(rl)
      this.drawImageCircle(xl)
    },
    moveCallback (e) {
      if (e.target !== this.$refs.svg) {
        return
      }
      const x = e.offsetX / this.lengthUnit - 1
      const y = 1 - e.offsetY / this.lengthUnit
      // const rl = (1 - x * x - y * y) / ((1 - x) * (1 - x) + y * y)
      // const xl = 2 * y / ((1 - x) * (1 - x) + y * y)
      this.$emit('v-mousemove', { x, y })
      // this.drawRealCircle(rl)
      // this.drawImageCircle(xl)
    },
    createRealCircle (rl, stroke = 'black') {
      const radius = 1 / (1 + rl)
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.classList.add('axis')
      circle.style.stroke = stroke
      circle.cx.baseVal.value = this.length - radius * this.lengthUnit
      circle.cy.baseVal.value = this.length / 2
      circle.r.baseVal.value = radius * this.lengthUnit
      return circle
    },
    createImageCircleCmd (xl) {
      if (xl === 0) {
        // cant draw rad, use line
        return `M${this.length} ${this.lengthUnit} L0 ${this.length / 2}`
      } else {
        const radius = 1 / xl
        const endX = 2 * radius * radius / (radius * radius + 1)
        const endY = 2 * radius / (radius * radius + 1)
        return `M${this.length} ${this.length / 2}
          A${radius * this.lengthUnit} ${radius * this.lengthUnit} 0 0 ${xl > 0 ? 1 : 0}
          ${this.length - endX * this.lengthUnit} ${this.length / 2 - endY * this.lengthUnit}`
      }
    },
    createImageCircle (xl, stroke = 'black') {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.classList.add('axis')
      path.style.stroke = stroke
      const d = document.createAttribute('d')
      d.nodeValue = this.createImageCircleCmd(xl)
      path.attributes.setNamedItem(d)
      return path
    },
    createAxis () {
      if (this.enableResistanceAxis) {
        this.$refs.svg.appendChild(this.createRealCircle(0))
        this.$refs.svg.appendChild(this.createRealCircle(0.3))
        this.$refs.svg.appendChild(this.createRealCircle(1))
        this.$refs.svg.appendChild(this.createRealCircle(3))
        this.$refs.svg.appendChild(this.createImageCircle(0))
        this.$refs.svg.appendChild(this.createImageCircle(0.4))
        this.$refs.svg.appendChild(this.createImageCircle(1))
        this.$refs.svg.appendChild(this.createImageCircle(2))
        this.$refs.svg.appendChild(this.createImageCircle(-0.4))
        this.$refs.svg.appendChild(this.createImageCircle(-1))
        this.$refs.svg.appendChild(this.createImageCircle(-2))
      }
      if (this.enableAdmittanceAxis) {
        this.$refs.svg.appendChild(this.createRealAdmittanceCircle(0))
        this.$refs.svg.appendChild(this.createRealAdmittanceCircle(0.3))
        this.$refs.svg.appendChild(this.createRealAdmittanceCircle(1))
        this.$refs.svg.appendChild(this.createRealAdmittanceCircle(3))
        this.$refs.svg.appendChild(this.createImageAdmittanceCircle(0))
        this.$refs.svg.appendChild(this.createImageAdmittanceCircle(0.4))
        this.$refs.svg.appendChild(this.createImageAdmittanceCircle(1))
        this.$refs.svg.appendChild(this.createImageAdmittanceCircle(2))
        this.$refs.svg.appendChild(this.createImageAdmittanceCircle(-0.4))
        this.$refs.svg.appendChild(this.createImageAdmittanceCircle(-1))
        this.$refs.svg.appendChild(this.createImageAdmittanceCircle(-2))
      }
    }
  },
  async mounted () {
    // init axis
    this.createAxis()
    // init pointer
    if (isFinite(this.r)) {
      this.drawRealCircle(this.r)
    }
    if (isFinite(this.x)) {
      this.drawImageCircle(this.x)
    }
  },
  watch: {
    r: function (r) {
      if (isFinite(r)) {
        this.drawRealCircle(r)
      }
    },
    x: function (x) {
      if (isFinite(x)) {
        this.drawImageCircle(x)
      }
    }
  }
}
</script>

<style>
  .axis {
    stroke-width: 1px;
    fill: none;
  }
</style>
