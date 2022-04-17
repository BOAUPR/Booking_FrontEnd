<template>
  <div>
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
          <b-form-radio-group
            v-model="form.roles"
            :options="allRoles"
            :state="state"
            name="radio-validation"
          >
            <b-form-invalid-feedback :state="state"
              >select one</b-form-invalid-feedback
            >
          </b-form-radio-group>
        </b-form-group>

        <b-form-group
          id="form-group-user-institution"
          label="หน่วยงาน"
          label-for="user-institution"
        >
          <b-form-select
            v-model="form.institution"
            :options="allInstitution"
            class="mb-3"
          >
            <template #first>
              <b-form-select-option :value="null" disabled
                >-- select an option --</b-form-select-option
              >
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
import api from '../../services/api.js'
export default {
  components: {},
  props: {
    user: Object,
    roless: Array,
    institutions: Array,
    insAdmin: Object
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
      allRoles: [{}],
      selectRoles: [],
      value: [],
      yourInsti: {}
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
      return this.form.roles.length !== 0
    },
    validateInstitution () {
      return this.form.institution.length !== 0
    },
    validateForm () {
      return (
        this.validateName &&
        this.validateSurname &&
        this.validateRoles &&
        this.validateInstitution
      )
    },
    state () {
      return Boolean(this.value)
    }
  },
  methods: {
    check (e) {
      this.$nextTick(() => {
        if (e.target.checked) {
        }
      })
    },

    getValueInstitution () {
      if (this.roless[0] === 'LOCAL_ADMIN') {
        for (const i of this.institutions) {
          this.allInstitution.push({
            value: i,
            text: i.name
          })
        }
      } else {
        this.allInstitution.push(this.user.institution.name)
      }
    },

    checkRoles (roles) {
      if (roles[0] === 'LOCAL_ADMIN') {
        this.allRoles = ['ADMIN', 'USER', 'APPROVER']
      } else if (roles[0] === 'ADMIN') {
        this.allRoles = ['USER', 'APPROVER']
      }
      return this.allRoles
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
      const selectThis = []
      selectThis.push(this.form.roles)
      this.form.roles = []
      this.form.roles = selectThis
      this.form.username = this.user.username
      this.form.password = this.user.password
      this.selectinstitution(this.form.institution)
      // this.form.institution = {}
      // this.form.institution = this.yourInsti._id
      // console.log(this.yourInsti)
      // console.log(this.user)
      // console.log(this.form)
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
    selectinstitution (name) {
      const self = this
      api
        .get('http://localhost:3000/institution/name/' + name)
        .then((response) => {
          self.yourInsti = response.data[0]
          self.form.institution = self.yourInsti._id
          console.log(self.user)
          console.log(self.form)
          const user = JSON.parse(JSON.stringify(self.form))
          this.$emit('save', user)
          this.reset()
        })
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
        this.form.institution = this.user.institution.name
        this.getValueInstitution()
        this.checkRoles(this.roless)
      }
    },
    resetModal (evt) {
      this.reset()
    },
    handleOk (evt) {
      evt.preventDefault()
      if (!this.validateForm) return
      this.submit()
      this.$nextTick(() => {
        this.$bvModal.hide('modal-user')
      })
    }
  },
  mounted () {}
}
</script>
<style></style>
