<template>
  <div>
    <b-modal
     id="modal-building"
     ref="modalBuilding"
     title="จัดการตึก"
     @show="showModal"
     @hidden="resetModal"
     @ok="handleOk"
    >
     <b-form @submit.prevent="submit()" @reset.prevent="reset()">
       <b-form-group
        id="form-group-building-code"
        label="รหัสย่ออาคาร"
        label-for="building-code"
       >
        <b-form-input
            type="text"
            id="building-code"
            v-model="form.code"
            :state="validateCode"
            autofocus
          >
          </b-form-input>
          <b-form-invalid-feedback :state="validateCode">
            รหัสอาคารต้องมีความยาวอย่างน้อย 1 ตัวอักษร
          </b-form-invalid-feedback>
       </b-form-group>

       <b-form-group
        id="form-group-building-name"
        label="ชื่ออาคาร"
        label-for="building-name"
       >
        <b-form-input
            type="text"
            id="building-name"
            v-model="form.name"
            :state="validateName"
          >
          </b-form-input>
          <b-form-invalid-feedback :state="validateName">
            ชื่ออาคารต้องมีความยาวอย่างน้อย 3 ตัวอักษร
          </b-form-invalid-feedback>
       </b-form-group>

       <b-form-group
        id="form-group-building-floor"
        label="จำนวนชั้น"
        label-for="building-floor"
       >
        <b-form-input
            type="number"
            id="building-floor"
            v-model="form.floor"
            :state="validateFloor"
          >
          </b-form-input>
          <b-form-invalid-feedback :state="validateFloor">
            จำนวนชั้นอาคารต้องมีอย่างน้อย 1 ชั้น
          </b-form-invalid-feedback>
       </b-form-group>

     </b-form>
    </b-modal>
  </div>
</template>
<script>
export default {
  props: {
    building: Object
  },
  data () {
    return {
      form: {
        _id: '',
        code: '',
        name: '',
        floor: 1,
        rooms: [{}],
        institution: {}
      },
      isAddNew: false
    }
  },
  computed: {
    validateName () {
      return this.form.name.length >= 3
    },
    validateFloor () {
      return this.form.floor >= 1
    },
    validateCode () {
      return this.form.code.length >= 1
    },
    validateForm () {
      return this.validateName && this.validateFloor && this.validateCode
    }
  },
  methods: {
    show () {
      this.$refs.modalBuilding.show()
    },
    reset () {
      this.form = {
        _id: '',
        code: '',
        name: '',
        floor: 1,
        rooms: [{}],
        institution: {}
      }
    },
    showModal (evt) {
      if (this.isAddNew) {
        this.reset()
      } else {
        this.form._id = this.building._id
        this.form.code = this.building.code
        this.form.name = this.building.name
        this.form.floor = this.building.floor
        this.form.rooms = this.building.rooms
        this.form.institution = this.building.institution
      }
    },
    submit () {
      const building = JSON.parse(JSON.stringify(this.form))
      // building.price = parseFloat(product.price)
      this.$emit('save', building)
      this.reset()
    },
    handleOk (evt) {
      evt.preventDefault()
      if (!this.validateForm) return
      this.submit()
      this.$nextTick(() => {
        this.$bvModal.hide('modal-building')
      })
    },
    resetModal () {
      this.form = {
        _id: '',
        code: '',
        name: '',
        floor: 1,
        rooms: [{}],
        institution: {}
      }
    }
  }
}
</script>
<style>

</style>
