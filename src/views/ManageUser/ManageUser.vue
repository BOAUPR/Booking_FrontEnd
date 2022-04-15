<template>
  <div>
    <b-container fluid>
      <b-navbar>
      <b-navbar-brand href="#">จัดการผู้ใช้งาน</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
      </b-navbar-nav>
    </b-navbar>

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
              {{ getRolesName(item.roles) }}
            </template>
            <template #cell(institution)="{ item }" v-if="userRoles[0] === 'ADMIN'">
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
              this.makeToast('ลบสำเร็จ', 'ผู้ใช้งาน ' + item.name + ' ถูกลบแล้ว')
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
      // Updata
      api.patch('http://localhost:3000/users/' + item._id, item).then(
        function (response) {
          console.log('------------1')
          console.log(item._id)
          const updateUser = response.data
          this.getUsers()
          this.makeToast('ปรับปรุงสำเร็จ', 'ผู้ใช้งาน ' + updateUser.name + ' ถูกแก้ไขแล้ว')
        }.bind(this)
      )
        .catch(() => {
          this.makeToast('แก้ไขไม่สำเร็จ', 'ไม่สามารถแก้ไขผู้ใช้งาน ' + item.name)
        })
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
        self.allInstitution = response.data
      })
    },

    getUsers () {
      const self = this
      api.get('http://localhost:3000/users').then(
        function (response) {
          self.users = response.data
        }
      )
    },

    getRolesName (item) {
      var roles = []
      roles += item
      return roles
    },

    getName (itemName, itemSurname) {
      var name = ''
      name += itemName + ' ' + itemSurname
      return name
    }
  },

  data () {
    return {
      fields: [
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
      allInstitution: [],
      userRoles: this.$store.getters['auth/isRole']
    }
  },
  mounted () {
    this.getUsers()
    this.getInstitution()
  }
}
</script>
<style></style>
