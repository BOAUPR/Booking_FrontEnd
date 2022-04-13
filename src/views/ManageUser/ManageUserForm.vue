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
          <b-form-input
            type="text"
            id="user-roles"
            placeholder="สถานะ"
            v-model="form.rolse"

          >
          </b-form-input>
        </b-form-group>

        <b-form-group
          id="form-group-user-institution"
          label="หน่วยงาน"
          label-for="user-institution"
        >
          <b-form-input
            type="text"
            id="user-institution"
            placeholder="หน่วยงาน"
            v-model="form.institution"
          >
          </b-form-input>
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
export default {
  props: {
    user: {
      user: Object,
      roles: Array
    }
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
      isAddNew: false
    }
  },
  computed: {
    validateName () {
      return this.form.name.length >= 1
    },
    validateSurname () {
      return this.form.surname.length >= 1
    },
    validateForm () {
      return this.validateName && this.validateSurname
    }
  },
  methods: {
    addNew () {
      this.isAddNew = true
      this.$nextTick(() => {
        this.show()
        this.isAddNew = false
      })
    },
    show () {
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
    },
    showModal (evt) {
      if (this.isAddNew) {
        this.reset()
      } else {
        // Edit
        this.form._id = this.user._id
        this.form.name = this.user.name
        this.form.surname = this.user.surname
        this.form.roles = this.user.roles
        this.form.institution = this.user.institution
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
  }
}
</script>
<style></style>
