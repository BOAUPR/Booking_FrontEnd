<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: true
    }
  },
  components: {
    // Menu
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
    },
    onsubmit (event) {
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
