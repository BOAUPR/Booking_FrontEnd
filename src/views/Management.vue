<template>
  <div>
    <b-container fluid>
      <b-navbar>
      <b-navbar-brand href="#">จัดการผู้ใช้งาน</b-navbar-brand>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="ค้นหา"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit" >ค้นหา</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>

      <b-row>
        <b-col class="text-right">
          <!-- <b-button @click="newUser()" variant="primary">เพิ่มใหม่</b-button> -->
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-table :items="users" :fields="fields">
            <template #cell(action)="{ item }">
              <!-- Product {{ item.userId }} -->
              <b-button @click="editUser(item)">แก้ไข</b-button
              ><b-button
                class="ml-1"
                variant="danger"
                @click="deleteUser(item)"
                >ลบ</b-button
              >
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>

import axios from 'axios'
export default {
  methods: {
    editUser (item) {},
    deleteUser (item) {},
    getIsInstitution (item) {
      const self = this
      if (self.isInstitution === false) {
        console.log(item)
        axios.get('http://localhost:3000/institutions/' + item).then((response) => {
          self.isInstitutionSelect = response.data
          console.log(self.isInstitutionSelect.name)
        })
        self.isInstitution = true
      }
      return self.isInstitutionSelect.name
    },
    getUsers () {
      const self = this
      axios.get('http://localhost:3000/users').then(
        function (response) {
          console.log(response)
          self.users = response.data
        }
      )
      console.log(this.fields)
    }
  },

  data () {
    return {
      fields: [
        { key: '_id', label: 'ลำดับ' },
        // { key: 'username', label: 'USERNAME' },
        // { key: 'password', label: 'PASSWORD' },
        { key: 'name', label: 'ชื่อ' },
        { key: 'surname', label: 'นามสกุล' },
        { key: 'roles', label: 'สถานะ' },
        { key: 'institution', label: 'หน่วยงาน' },
        { key: 'action', label: 'Action' }
      ],
      users: [],
      isInstitutionSelect: {},
      isInstitution: false
    }
  },
  mounted () {
    this.getUsers()
  }
}
</script>
<style></style>
