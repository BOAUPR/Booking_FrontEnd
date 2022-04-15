<template>
  <div>
    <b-container>
      <b-row align-h="center">
        <b-col cols="4">
          <b-card
            title="Login"
          >
            <b-card-text>
              <div>
              <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-form-group
                  id="input-group-1"
                  label="USERNAME"
                  label-for="input-1"
                  label-cols="4"
                >
                  <b-form-input
                    id="input-1"
                    v-model="form.username"
                    type="text"
                    placeholder="Enter Username"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-2"
                  label="PASSWORD"
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
              </div>
              {{ $store.state.auth.user }}
              {{ $store.getters['auth/isLogin'] }}
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      show: true
    }
  },
  components: {
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
    },
    onSubmit (event) {
      event.preventDefault()
      this.$store.dispatch('auth/login', this.form)
    },
    onReset (event) {
      event.preventDefault()
      // Reset our form values
      this.form.username = ''
      this.form.password = ''
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  },
  computed: {
    isLogin () {
      return this.$store.getters['auth/isLogin']
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
