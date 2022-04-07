<template>
  <b-row align-h="center">
    <b-col cols="4">
      <b-card
        title="Login"
        src="../assets/logo_user.png"
        tag="article"
        style="max-width: 40rem"
        class="mb-2"
      >
        <img
          alt="Vue logo"
          src="../assets/logo_user.png"
          width="100"
          class="mb-2"
        />
        <b-card-text>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
              id="input-group-1"
              label="USERNAME:"
              label-for="input-1"
              label-cols="4"
            >
              <b-form-input
                id="input-1"
                v-model="form.name"
                type="text"
                placeholder="Enter Username"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="PASSWORD:"
              label-for="input-2"
              label-cols="4"
            >
              <b-form-input
                id="input-2"
                v-model="form.password"
                placeholder="Enter password"
                required
                type="password"
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary" class="m-3"
              >Login</b-button
            >
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
          <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ form }}</pre>
          </b-card>
          {{ $store.state.auth.user }}
          {{ $store.getters['auth/isLogin'] }}
        </b-card-text>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        password: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset (event) {
      event.preventDefault()

      this.form.name = ''
      this.form.password = ''

      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
