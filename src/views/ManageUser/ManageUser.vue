<template>
  <div>
    <b-container fluid>
      <b-navbar>
      <b-navbar-brand href="#">จัดการผู้ใช้งาน</b-navbar-brand>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input id="search" size="sm" class="mr-sm-2" placeholder="ค้นหา"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit" >ค้นหา</b-button>
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
            :user="selectedItem" :institutions="allInstitution"
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
      this.allRoles = item.roles
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
              this.makeToast('ลบสำเร็จ', 'สินค้า ' + item.name + ' ถูกลบแล้ว')
            }.bind(this)
          )
          .catch(() => {
            this.makeToast(
              'ลบไม่สำเร็จ',
              'ไม่สามารถลบ ' + item.name + 'danger'
            )
          })
      }
    },
    saveUser (item) {
      console.log('Submit', item)
      if (item._id === '') {
        // Add New
        api.post('http://localhost:3000/users/', item).then(
          function (response) {
            const newUser = response.data
            this.getUsers()
            this.makeToast('เพิ่มสำเร็จ', 'ผู้ใช้งาน ' + newUser.name + ' ถูกเพิ่มแล้ว')
          }.bind(this)
        )
          .catch(() => {
            this.makeToast('เพิ่มไม่สำเร็จ', 'ไม่สามารถเพิ่มผู้ใช้งาน ' + item.name, 'danger')
          })
      } else {
        // Updata
        api.put('http://localhost:3000/users/' + item._id, item).then(
          function (response) {
            const updateUser = response.data
            this.getUsers()
            this.makeToast('ปรับปรุงสำเร็จ', 'ผู้ใช้งาน ' + updateUser.name + ' ถูกแก้ไขแล้ว')
          }.bind(this)
        )
          .catch(() => {
            this.makeToast('แก้ไขไม่สำเร็จ', 'ไม่สามารถแก้ไขผู้ใช้งาน ' + item.name)
          })
      }
    },
    makeToast (title, massage, variant = 'sucess', append = false) {
      this.toastCount++
      this.$bvToast.toast(massage, {
        title: title,
        variant: variant,
        autoHideDelay: 3000,
        appendToast: append
      })
    },
    getInstitution () {
      const self = this
      api.get('http://localhost:3000/institution/').then((response) => {
        console.log('--------------------')
        console.log(response.data)
        self.allInstitution = response.data
      })
      console.log('--------------------')
      console.log(this.allInstitution)
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
    // getAllRoles (item) {
    //   const self = this
    //   for (let index = 0; index < item.roles.length; index++) {
    //     self.allRoles += item[index].roles
    //   }
    // },

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
      isInstitution: false,
      allRoles: [],
      allInstitution: []
    }
  },
  mounted () {
    this.getUsers()
    this.getInstitution()
  }
}
</script>
<style></style>
