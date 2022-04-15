<template>
  <div>
    <b-button @click="addNew" size="sm" class="my-2 my-sm-0" >เพิ่มผู้ใช้งาน</b-button>
    <b-modal
      id="modal-user"
      ref="modalUser"
      title="ผู้ใช้งาน"
      @show="showModal"
      @hiddan="resetModal"
      @ok="handleOk"
    >
      <b-form @submit.prevent="submit()" @reset.stop.prevent="reset()">
        <b-form-group
          id="form-group-user-name"
          label="ชื่อ"
          label-for="user-name"
        >
          <b-form-input
            type="text"
            id="user-name"
            placeholder="ชื่อ"
            v-model="form.name"
            :state="validateName"
            autofocus
          >
          </b-form-input>
        </b-form-group>

        <b-form-group
          id="form-group-user-surname"
          label="นามสกุล"
          label-for="user-surname"
          :state="validateSurname"
        >
          <b-form-input
            type="text"
            id="user-surname"
            placeholder="นามสกุล"
            v-model="form.surname"
            :state="validateSurname"
          >
          </b-form-input>
        </b-form-group>

        <b-form-group
          id="form-group-user-roles"
          label="สถานะ"
          label-for="user-roles"

        >
          <tr v-for="roles in allRoles" :key="roles">
           <Checkbox v-model="selectRoles" :value="roles"> : {{ roles }} </Checkbox>
        </tr>
        </b-form-group>

        <b-form-group
          id="form-group-user-institution"
          label="หน่วยงาน"
          label-for="user-institution"
        >
          <b-form-select v-model="form.institution" :options="allInstitution" class="mb-3">
          <template #first>
        <b-form-select-option :value="null" disabled>-- select an option --</b-form-select-option>
          </template>
        </b-form-select>

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
import Checkbox from 'vue-material-checkbox'
export default {
  components: {
    Checkbox
  },
  props: {
    user: Object,
    roless: Array,
    institutions: Array
  },
  data () {
    return {
      form: {
        _id: '',
        name: '',
        surname: '',
        roles: [{}],
        institution: {}
      },
      isAddNew: false,
      allInstitution: [],
      allRoles: ['LOCAL_ADMIN', 'ADMIN', 'USER', 'APPROVER'],
      selectRoles: []
    }
  },
  computed: {
    validateName () {
      return this.form.name.length >= 1
    },
    validateSurname () {
      return this.form.surname.length >= 1
    },
    validateRoles () {
      return this.form.roles.length === 1
    },
    validateInstitution () {
      return this.form.institution.length >= 1
    },
    validateForm () {
      return this.validateName && this.validateSurname && this.validateRoles && this.validateInstitution
    }
  },
  methods: {
    check (e) {
      this.$nextTick(() => {
        if (e.target.checked) {
          console.log(e.target.value) // Pass this value in API
        }
      })
    },

    getValueInstitution () {
      console.log(this.institutions)
      for (const i of this.institutions) {
        this.allInstitution.push({
          value: i,
          text: i.name
        })
      }
      console.log('----------')
      console.log(this.allInstitution)
    },
    addNew () {
      this.isAddNew = true
      this.$nextTick(() => {
        this.show()
        this.isAddNew = false
      })
    },
    show () {
      this.allInstitution = []
      this.$refs.modalUser.show()
    },
    submit () {
      const user = JSON.parse(JSON.stringify(this.form))
      this.$emit('save', user)
      this.reset()
    },
    reset () {
      this.form = {
        _id: '',
        name: '',
        surname: '',
        roles: [{}],
        institution: {}
      }
      this.allRoles = []
      this.allInstitution = []
      this.selectRoles = []
    },
    resetNew () {
      this.form = {
        _id: '',
        name: '',
        surname: '',
        roles: [{}],
        institution: {}
      }
      this.allRoles = ['LOCAL_ADMIN', 'ADMIN', 'USER', 'APPROVER']
      this.getValueInstitution()
      // this.allInstitution = this.user.institution
      this.selectRoles = []
    },
    showModal (evt) {
      if (this.isAddNew) {
        this.resetNew()
      } else {
        // Edit
        this.form._id = this.user._id
        this.form.name = this.user.name
        this.form.surname = this.user.surname
        this.form.roles = this.user.roles
        this.form.institution = this.user.institution
        this.getValueInstitution()
      }
    },
    resetModal (evt) {
      this.reset()
    },
    handleOk (evt) {
      evt.preventDefault()
      // if (!this.validateForm) return
      this.submit()
      this.$nextTick(() => {
        this.$bvModal.hide('modal-user')
      })
    }
  }
}
</script>
<style></style>
