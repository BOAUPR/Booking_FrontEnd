<template>
  <b-container>
    <header class="bd-content" align="left">
      <h1 class="bv-no-focus-ring">
        <span class="bd-content-title">สถานะการจอง</span>
      </h1>
    </header>
    <b-table :items="waitingapprover" :fields="fields">
      <template #cell(user)="{ item }">
        {{ item.user.name }} {{ item.user.surname }}
      </template>
      <template #cell(status)="{ item }">
        {{ isStatus(item.status) }}
      </template>
      <template #cell(operators)="{ item }">
              <b-button @click="editUser(item)">อนุมัติ</b-button
              ><b-button
                class="ml-1"
                variant="danger"
                @click="deleteUser(item)"
                >ไม่อนุมัติ</b-button
              >
            </template>
    </b-table>
  </b-container>
</template>

<script>
import api from '../services/api'
export default {
  data () {
    return {
      fields: [
        { key: 'user', label: 'ชื่อ-นามสกุล' },
        { key: 'startDate', label: 'วัน/เวลาเริ่มต้น' },
        { key: 'endDate', label: 'วัน/เวลาสิ้นสุด' },
        { key: 'reason', label: 'วัตถุประสงค์' },
        { key: 'tool', label: 'อุปกรณ์' },
        { key: 'status', label: 'สถานะ' },
        { key: 'operators', label: 'กระบวนการ' }
      ],
      waitingapprover: []
    }
  },
  methods: {

    async getAllWaiting () {
      const self = this
      api.get('http://localhost:3000/booking/getall').then((response) => {
        console.log(response)
        self.waitingapprover = response.data
      })
    },
    isUser () {
      const self = this
      if (self.checkU === false) {
        self.userb = this.isUserCurrent
        self.checkU = true
      }
    },
    isStatus (item) {
      var status = []
      if (item === '0') {
        status += 'รอการอนุมัติ'
      }
      return status
    }
  },
  computed: {
    isUserCurrent () {
      return this.$store.getters['auth/isUserCurrent']
    }
  },
  mounted () {
    this.isUser()
    this.getAllWaiting()
  }
}
</script>
<style></style>
