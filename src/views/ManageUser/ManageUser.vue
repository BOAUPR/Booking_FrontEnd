<template>
  <div>
    <b-container fluid>
      <b-navbar>
      <b-navbar-brand href="#">จัดการผู้ใช้งาน</b-navbar-brand>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input id="search" size="sm" class="mr-sm-2" placeholder="ค้นหา"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit" >เพิ่มผู้ใช้งาน</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>

      <!-- <b-row>
        <b-col class="text-right">
          <b-button @click="newUser()" variant="primary">เพิ่มใหม่</b-button>
        </b-col>
      </b-row> -->

      <b-row>
        <b-col class="text-right">
          <ManageUserForm
            :user="selectedItem"
            ref="manageUserForm"
            @save="saveUser"
          ></ManageUserForm>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-table :items="users" :fields="fields">
            <template #cell(action)="{ item }">
              <b-button @click="editUser(item)">แก้ไข</b-button
              ><b-button
                class="ml-1"
                variant="danger"
                @click="deleteUser(item)"
                >ลบ</b-button
              >
            </template>
            <template #cell(name)="{ item }">
              {{ getName(item.name,item.surname) }}
            </template>
            <template #cell(roles)="{ item }">
              {{ getRolse(item.roles) }}
            </template>
            <template #cell(institution)="{ item }">
              {{ item.institution.name }}
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>

import api from '../../services/api.js'
import ManageUserForm from './ManageUserForm.vue'
export default {
  components: {
    ManageUserForm
  },
  methods: {
    editUser (item) {
      this.selectedItem = JSON.parse(JSON.stringify(item))
      this.$nextTick(() => {
        this.$refs.manageUserForm.show()
      })
    },
    deleteUser (item) {
      if (confirm(`คุณต้องการลบ ${item.name} หรือไม่?`)) {
        api
          .delete('http://localhost:3000/users/' + item._id)
          .then(
            function (response) {
              this.getUsers()
              this.makeToast('ลบสำเร็จ', 'สินค้า ' + item._id + ' ถูกลบแล้ว')
            }.bind(this)
          )
          .catch(() => {
            this.makeToast(
              'ลบไม่สำเร็จ',
              'ไม่สามารถลบ ' + item._id + 'danger'
            )
          })
      }
    },
    saveUser (item) {
      console.log('Submit', item)
      if (item._id === '') {
        // Add New
        api
          .post('http://localhost:3000/users', item)
          .then(
            function (response) {
              const newUser = response.data
              this.getUsers()
              this.makeToast(
                'เพิ่มสำเร็จ',
                'ผู้ใช้งาน ' + newUser._id + ' ถูกเพิ่มแล้ว'
              )
            }.bind(this)
          )
          .catch(() => {
            this.makeToast(
              'เพิ่มไม่สำเร็จ',
              'ไม่สามารถเพิ่ม ' + item._id + 'danger'
            )
          })
      } else {
        // Updata
        api
          .put('http://localhost:3000/users/' + item._id, item)
          .then(
            function (response) {
              const updateUser = response.data
              this.getUsers()
              this.makeToast(
                'ปรับปรุงสำเร็จ',
                'ผู้ใช้งาน ' + updateUser._id + ' ถูกแก้ไขแล้ว'
              )
            }.bind(this)
          )
          .catch(() => {
            this.makeToast(
              'ปรับปรุงไม่สำเร็จ',
              'ไม่สามารถปรับปรุง ' + item._id + 'danger'
            )
          })
      }
    },
    getIsInstitution (item) {
      api.get('http://localhost:3000/institutions/' + item).then((response) => {
        this.institutionSelect = response.data
        console.log('Name' + this.institutionSelect.name)
        return this.institutionSelect.name
      })
    },
    getUsers () {
      const self = this
      api.get('http://localhost:3000/users').then(
        function (response) {
          console.log(response)
          self.users = response.data
        }
      )
      console.log(this.fields)
    },
    getRolse (item) {
      var roles = []
      for (let index = 0; index < item.length; index++) {
        roles += item[index]
        if (index !== item.length - 1) {
          roles += ', '
        }
      }
      console.log(roles)
      return roles
    },
    getName (itemName, itemSurname) {
      var name = ''
      name += itemName + ' ' + itemSurname
      console.log(name)
      return name
    }
  },

  data () {
    return {
      fields: [
        // { key: 'username', label: 'USERNAME' },
        // { key: 'password', label: 'PASSWORD' },
        { key: 'name', label: 'ชื่อ - สกุล' },
        { key: 'roles', label: 'สถานะ' },
        { key: 'institution', label: 'หน่วยงาน' },
        { key: 'action', label: 'Action' }
      ],
      users: [],
      selectedItem: null,
      institutionSelect: {},
      isInstitution: false
    }
  },
  mounted () {
    this.getUsers()
  }
}
</script>
<style></style>
