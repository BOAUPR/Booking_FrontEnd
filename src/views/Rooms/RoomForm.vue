<template>
  <div>
    <b-modal
     id="modal-room"
     ref="modalRoom"
     title="จัดการห้อง"
     @show="showModal"
     @hidden="resetModal"
     @ok="handleOk"
    >
     <b-form @submit.prevent="submit()" @reset.prevent="reset()">
       <b-form-group
        id="form-group-room-code"
        label="รหัสย่อห้อง"
        label-for="room-code"
       >
        <b-form-input
            type="text"
            id="room-code"
            v-model="form.code"
            :state="validateCode"
            autofocus
          >
          </b-form-input>
       </b-form-group>

       <b-form-group
        id="form-group-room-name"
        label="ชื่อห้อง"
        label-for="room-name"
       >
        <b-form-input
            type="text"
            id="building-name"
            v-model="form.name"
            :state="validateName"
          >
          </b-form-input>
       </b-form-group>

       <b-form-group
        id="form-group-room-capacity"
        label="ความจุ"
        label-for="room-capacity"
       >
        <b-form-input
            type="number"
            id="room-capacity"
            v-model="form.capacity"
            :state="validateCap"
          >
          </b-form-input>
       </b-form-group>

       <b-form-group
        id="form-group-room-floor"
        label="ชั้น"
        label-for="room-floor"
       >
        <b-form-input
            type="number"
            id="room-floor"
            v-model="form.floor"
            :state="validateFloor"
          >
          </b-form-input>
       </b-form-group>

       <b-form-group
        id="form-group-room-equipment"
        label="อุปกรณ์เริ่มต้นภายในห้อง"
        label-for="room-equipment"
       >
        <b-form-input
            type="text"
            id="building-equipment"
            v-model="form.equipment"
            :state="validateEquip"
          >
          </b-form-input>
       </b-form-group>

       <b-form-group
        id="form-group-room-"
        label="ผู้พิจารณา"
        label-for="room-approveres"
       >

        <tr v-for="approv in approvs" :key="approv._id">
           <Checkbox v-model="selectApprov" :value="approv._id"> : {{ approv.name }} {{ approv.surname }} </Checkbox>
        </tr>

       </b-form-group>

     </b-form>
     <b-card>
        <pre>
        {{ form }}
      </pre
        >
      </b-card>
    </b-modal>
  </div>
</template>
<script>
// import api from '../services/api'
import Checkbox from 'vue-material-checkbox'
export default {
  components: {
    Checkbox
  },
  props: {
    room: Object,
    approvs: Array
  },
  data () {
    return {
      form: {
        _id: '',
        code: '',
        name: '',
        capacity: 50,
        floor: 1,
        equipment: '',
        building: {},
        approveres: [{}]
      },
      allApprov2: [],
      isAddNew: false,
      allApprov: [],
      selectApprov: []
    }
  },
  computed: {
    validateName () {
      return this.form.name.length >= 3
    },
    validateFloor () {
      return this.form.floor >= 1
    },
    validateCap () {
      return this.form.capacity >= 50
    },
    validateCode () {
      return this.form.name.length >= 1
    },
    validateEquip () {
      return true
    },
    validateApprov () {
      return this.form.approveres.length >= 1
    },
    validateForm () {
      return this.validateName && this.validateFloor && this.validateCode && this.validateCap && this.validateEquip && this.validateApprov
    }
  },
  methods: {
    checkNullApprov (item) {
      if (item == null) {
        return true
      } else { return true }
    },
    check (e) {
      this.$nextTick(() => {
        if (e.target.checked) {
          // console.log(e.target.value) // Pass this value in API
        }
      })
    },

    getValueApprover () {
      // console.log(this.allApprov2)
      for (const i of this.allApprov2) {
        this.allApprov.push({
          value: i,
          text: i.name + ' ' + i.surname
        })
      }
      // console.log('--------')
      // console.log(this.allApprov)
    },
    show () {
      this.$refs.modalRoom.show()
    },
    reset () {
      this.form = {
        _id: '',
        code: '',
        name: '',
        capacity: 50,
        floor: 1,
        equipment: '',
        building: {},
        approveres: [{}]
      }
      this.allApprov = []
      this.selectApprov = []
    },
    showModal (evt) {
      if (this.isAddNew) {
        this.reset()
      } else {
        this.form._id = this.room._id
        this.form.code = this.room.code
        this.form.name = this.room.name
        this.form.floor = this.room.floor
        this.form.capacity = this.room.capacity
        this.form.building = this.room.building
        this.form.equipment = this.room.equipment
        this.form.approveres = this.selectApprov
        this.allApprov2 = this.approvs
        this.getValueApprover()
      }
    },
    submit () {
      const room = JSON.parse(JSON.stringify(this.form))
      // building.price = parseFloat(product.price)
      this.$emit('save', room)
      this.reset()
    },
    handleOk (evt) {
      evt.preventDefault()
      if (!this.validateForm) return
      this.submit()
      this.$nextTick(() => {
        this.$bvModal.hide('modal-room')
      })
    },
    resetModal () {
      this.form = {
        _id: '',
        code: '',
        name: '',
        capacity: 50,
        floor: 1,
        equipment: '',
        building: {},
        approveres: [{}]
      }
      this.allApprov = []
      this.selectApprov = []
    }
  },
  mounted () {
  }
}
</script>
<style>

</style>
