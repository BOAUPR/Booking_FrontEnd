<template>
  <div class="app-menu min-vh-100">
    <b-img src="../assets/chicken.jpg" width="100%" center class="pt-4 pb-4"></b-img>
    <div class="h5">
      {{ isRole.toString() }}
      <br>
      {{ isName }} {{ isSurname }}
    </div>
    <br>
    <br>
    <b-nav vertical>
      <b-nav-item to="/building">
        <b-button class="buttonMenu" variant="outline-secondary">
          <b-icon-book></b-icon-book> <br />
          ตารางการใช้ห้อง
        </b-button></b-nav-item
      >
      <b-nav-item to="/status">
        <b-button class="buttonMenu" variant="outline-secondary">
          สถานะการจอง
        </b-button></b-nav-item
      >
      <b-nav-item
        v-if="check[0] !== 'USER' && check[0] !== 'ADMIN'"
        to="/bookinglist"
      >
        <b-button class="buttonMenu" variant="outline-secondary">
          รายการจอง
        </b-button></b-nav-item
      >
      <b-nav-item
        v-if="check[0] !== 'USER' && check[0] !== 'APPROVER'"
        to="/manageuser"
      >
        <b-button class="buttonMenu" variant="outline-secondary">
          จัดการข้อมูลผู้ใช้
        </b-button></b-nav-item
      >
      <b-nav-item
        v-if="
          check[0] !== 'USER' && check[0] !== 'APPROVER' && check[0] !== 'ADMIN'
        "
        to="/managebuilding"
      >
        <b-button class="buttonMenu" variant="outline-secondary">
          จัดการข้อมูลอาคาร
        </b-button></b-nav-item
      >
      <b-nav-item
        v-if="check[0] !== 'USER' && check[0] !== 'APPROVER'"
        to="/manageroom"
      >
        <b-button class="buttonMenu" variant="outline-secondary">
          จัดการข้อมูลห้อง
        </b-button></b-nav-item
      >
      <b-nav-item>
        <b-button
          class="buttonMenu"
          variant="outline-secondary"
          @click="logout()"
        >
          ออกจากระบบ
        </b-button></b-nav-item
      >
    </b-nav>
  </div>
</template>
<script>
export default {
  data () {
    return {
      check: this.$store.getters['auth/isRole']
    }
  },
  components: {},
  methods: {
    logout () {
      this.check = ''
      this.$store.dispatch('auth/logout')
    }
  },
  computed: {
    isRole () {
      return this.$store.getters['auth/isRole']
    },
    isName () {
      return this.$store.getters['auth/isName']
    },
    isSurname () {
      return this.$store.getters['auth/isSurname']

    }
  }
}
</script>
<style>
.buttonMenu {
  width: 100%;
}
.app-menu {
  background-color: rgb(233, 229, 229);
}
</style>
