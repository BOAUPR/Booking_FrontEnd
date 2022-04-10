<template>
  <div class="app-menu min-vh-100">
    <b-img src="../assets/chicken.jpg" width="100%" center class="pt-4 pb-4"></b-img>
    <div class="h3">
      User
    </div>
    <br>
    <br>
    <b-nav vertical>
      <b-nav-item to="/building"> <b-button class="buttonMenu" variant="outline-secondary"> <b-icon-book></b-icon-book> <br> ตารางการใช้ห้อง </b-button></b-nav-item>
      <b-nav-item> <b-button class="buttonMenu" variant="outline-secondary"> สถานะการจอง </b-button></b-nav-item>
      <b-nav-item> <b-button class="buttonMenu" variant="outline-secondary"> รายการจอง </b-button></b-nav-item>
      <b-nav-item> <b-button class="buttonMenu" variant="outline-secondary"> จัดการข้อมูลผู้ใช้ </b-button></b-nav-item>
      <b-nav-item to="/manageroom"> <b-button class="buttonMenu" variant="outline-secondary"> จัดการข้อมูลห้อง </b-button></b-nav-item>
      <b-nav-item> <b-button class="buttonMenu" variant="outline-secondary" @click="logout()"> ออกจากระบบ </b-button></b-nav-item>
    </b-nav>
  </div>
</template>
<script>
export default {
  components: {
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>
<style>
 .buttonMenu {
   width: 100%;
 }
 .app-menu{
   background-color: rgb(233, 229, 229);
 }
</style>
