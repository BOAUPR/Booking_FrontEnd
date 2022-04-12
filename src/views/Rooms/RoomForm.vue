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
        <b-form-select v-model="form.approveres[0]" :options="allApprov">
          <template #first>
            <b-form-select-option :value="form.approveres[0]"> {{ form.approveres[0].name }}  {{ form.approveres[0].surname }}</b-form-select-option>
          </template>
        </b-form-select>

        <b-form-select v-model="form.approveres[1]" :options="allApprov">
          <template #first>
            <b-form-select-option :value="form.approveres[1]"> {{ form.approveres[1].name }}  {{ form.approveres[1].surname }}</b-form-select-option>
          </template>
        </b-form-select>

        <b-form-select v-model="form.approveres[2]" :options="allApprov">
          <template #first>
            <b-form-select-option :value="form.approveres[2]"> {{ form.approveres[2].name }}  {{ form.approveres[2].surname }} </b-form-select-option>
          </template>
        </b-form-select>

        <!-- <tr v-for="approv in approvs" :key="approv._id">
           {{ approv.name }} {{ approv.surname }} : <input type="checkbox" :value="approv._id" v-model="form.approveres" @change="check">
        </tr> -->

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
// import axios from 'axios'
export default {
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
      selectApprov1: { value: {}, text: 'sumo' },
      selectApprov2: null,
      selectApprov3: null
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
    validateForm () {
      return this.validateName && this.validateFloor && this.validateCode && this.validateCap && this.validateEquip
    }
  },
  methods: {
    checkNullApprov (item) {
      if (item == null) {
        return false
      } else { return true }
    },
    check (e) {
      this.$nextTick(() => {
        if (e.target.checked) {
          console.log(e.target.value) // Pass this value in API
        }
      })
    },

    // getAllApprov () {
    //   const self = this
    //   axios.get('http://localhost:3000/users/approveres').then((response) => {
    //     self.allApprov2 = response.data
    //   })
    //   console.log('----------')
    //   console.log(this.allApprov2)
    //   for (let index = 0; index < this.allApprov2.length; index++) {
    //     this.allApprov[index].value = this.allApprov2[index]
    //     this.allApprov[index].text = this.allApprov2[index].name
    //   }

    //   console.log(this.allApprov)
    //   console.log(this.allApprov2[0].surname)
    // },
    getValueApprover () {
      console.log(this.allApprov2)
      for (const i of this.allApprov2) {
        this.allApprov.push({
          value: i,
          text: i.name + ' ' + i.surname
        })
      }
      console.log('--------')
      console.log(this.allApprov)
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
        this.form.approveres = this.room.approveres
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
    }
  },
  mounted () {
  }
}
</script>
<style>

</style>
