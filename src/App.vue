<template>
  <div id="app">

    <b-container v-if="!isLogint()">
      <b-row align-h="center">
        <b-col cols="4">
          <b-card
            title="Login"
            src="./assets/logo_user.png"
            tag="article"
            style="max-width: 40rem"
            class="mb-2"
          >
            <img
              alt="Vue logo"
              src="./assets/logo_user.png"
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

                <b-button type="submit" variant="primary" class="m-3" @click="login()"
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
    </b-container>

    <b-container fluid v-if="isLogint()">
      <b-row>
        <b-col cols="2" class="app-menu min-vh-100">
          <Menu />
        </b-col>
        <b-col cols="10">
          <b-container>
            <b-row>
              <b-col>
                <!-- <NavBar/> -->
                NavBar
              </b-col>
            </b-row>
            <b-row class="text-justify">
              <b-col><router-view></router-view></b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Menu from './components/Menu.vue'
export default {
  data () {
    return {
      isLogin: false,
      form: {
        name: '',
        password: ''
      },
      show: true
    }
  },
  components: {
    Menu
  },
  methods: {
    login () {
      this.isLogin = true
    },
    isLogint () {
      return this.isLogin
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
