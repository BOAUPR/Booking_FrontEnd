<template>
  <div>
    <b-button @click="addNew" variant="primary">เพิ่มผู้ใช้งาน</b-button>
    <b-modal
      id="modal-user"
      ref="modalUser"
      title="ผู้ใช้งาน"
      @show="showModal"
      @hiddan="resetModal"
      @ok="handleOk"
    >
      <b-form @submit.prevent="submit" @reset.stop.prevent="reset">
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
          >
          </b-form-input>
          <b-form-invalid-feedback :state="validateName">
            ชื่อสินค้าต้องมีความยาวอย่าง 3 ตัวอักษร
          </b-form-invalid-feedback>
        </b-form-group>
        <b-form-group
          id="form-group-user-surname"
          label="ราคาสินค้า"
          label-for="user-surname"
          :state="validatePrice"
          autofocus
        >
          <b-form-input
            type="text"
            id="product-surname"
            placeholder="นามสกุล"
            v-model="form.surname"
            :state="validatePrice"
          >
          </b-form-input>
          <!-- <b-form-invalid-feedback :state="validatePrice">
            ราคาสินค้าต้องไม่น้อกว่าหรือเท่ากับ 0 บาท
          </b-form-invalid-feedback> -->
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
    product: {
      type: Object
    }
  },
  data () {
    return {
      form: {
        _id: '',
        name: '',
        price: 0
      },
      isAddNew: false
    }
  },
  computed: {
    validateName () {
      return this.form.name.length >= 3
    },
    validatePrice () {
      return this.form.price !== '' && this.form.price >= 0
    },
    validateForm () {
      return this.validateName && this.validatePrice
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
      this.$refs.modalProduct.show()
    },
    submit () {
      const product = JSON.parse(JSON.stringify(this.form))
      product.price = parseFloat(product.price)
      this.$emit('save', product)
      this.reset()
    },
    reset () {
      this.form = {
        _id: '',
        name: '',
        price: 0
      }
    },
    showModal (evt) {
      if (this.isAddNew) {
        this.reset()
      } else {
        // Edit
        this.form._id = this.product._id
        this.form.name = this.product.name
        this.form.price = this.product.price
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
