<template>
  <Auth>
    <b-container fluid>
      <b-row>
        <b-col cols="2" class="app-menu min-vh-100">
          <Menu />
        </b-col>
        <b-col cols="10">
          <Booking />
          <b-container>
            <b-row>
              <b-col> </b-col>
            </b-row>
            <b-row class="text-justify">
              <b-col v-if="showT"><router-view /></b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </Auth>
</template>
<script>
import Menu from '../components/Menu.vue'
import Auth from '../components/Auth.vue'
import Booking from '../components/Booking.vue'
// import Table from '../components/Table.vue'
export default {
  data () {
    return {
      showT: true
    }
  },
  components: {
    Auth,
    Menu,
    Booking
    // Table
  },
  methods: {
    loadCom () {
      // return Table
    }
  }
}
</script>
<style></style>
