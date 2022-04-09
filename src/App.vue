<template>
  <div id="app">
    <Auth>
    <b-row>
      <b-col cols="2" class="app-menu min-vh-100" v-if="isLogin">
        <Menu/>
      </b-col>
      <b-col>
        <b-container>
          <b-row>
            <b-col><router-view /></b-col>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
    </Auth>
  </div>
</template>
<script>
import Menu from './components/Menu.vue'
import Auth from './components/Auth.vue'
export default {
  data () {
    return {
      show: true
    }
  },
  components: {
    Menu,
    Auth
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
    },
    login () {
      this.$store.dispatch('/login')
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
