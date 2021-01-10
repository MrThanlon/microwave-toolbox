<template>
  <div>
    <div class="card shadow">
      <h5 class="card-header">Smith圆图工具</h5>
      <div class="card-body p-0">
        <div class="d-flex justify-content-between flex-wrap p-2">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="ResistanceAxis" v-model="enableResistanceAxis">
            <label class="form-check-label" for="ResistanceAxis">阻抗坐标</label>
          </div>

          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="AdmittanceAxis" v-model="enableAdmittanceAxis">
            <label class="form-check-label" for="AdmittanceAxis">导纳坐标</label>
          </div>

          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="ResistanceCursor" v-model="enableResistanceCursor">
            <label class="form-check-label" for="ResistanceCursor">
              <span class="">阻抗光标</span>
              <span v-if="cursorZ!==null">Z={{renderComplex(cursorZ)}}</span>
            </label>
          </div>

          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="AdmittanceCursor" v-model="enableAdmittanceCursor">
            <label class="form-check-label" for="AdmittanceCursor">
              <span class="">导纳光标</span>
              <span v-if="cursorG!==null">Z={{renderComplex(cursorG)}}</span>
            </label>
          </div>
        </div>
        <smith
          :length="length" :r="r" :x="x"
          :key="length+enableResistanceAxis+enableAdmittanceAxis+enableResistanceCursor+enableAdmittanceCursor"
          @v-click="clickCallback"
          @v-mousemove="moveCallback"
          :enable-resistance-axis="enableResistanceAxis"
          :enable-admittance-axis="enableAdmittanceAxis"
          :enable-resistance-cursor="enableResistanceCursor"
          :enable-admittance-cursor="enableAdmittanceCursor"></smith>
      </div>
    </div>
  </div>
</template>

<script>
import smith from '@/components/smith'
export default {
  name: 'SmithChart',
  data () {
    return {
      length: 600,
      r: 1,
      x: 0,
      cursorZ: null,
      cursorG: null,
      enableResistanceAxis: true,
      enableAdmittanceAxis: false,
      enableResistanceCursor: true,
      enableAdmittanceCursor: false
    }
  },
  methods: {
    clickCallback (e) {
      console.debug(e)
      this.r = e.r
      this.x = e.x
    },
    moveCallback (e) {
      this.cursorZ = e.Z
      this.cursorG = e.G
    },
    renderComplex (c) {
      return `${c[0].toFixed(3)}${c[1] > 0 ? '+' : ''}${c[1].toFixed(3)}j`
    }
  },
  mounted () {
    if (document.body.clientWidth < 600) {
      this.length = document.body.clientWidth - 2
    }
  },
  components: {
    smith
  }
}
</script>

<style scoped>

</style>
