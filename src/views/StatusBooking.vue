<template>
  <b-container>
    <!-- {{userb._id}} -->
    {{ isBooking(userb._id) }}
    <header class="bd-content" align="left">
      <h1 class="bv-no-focus-ring">
        <span class="bd-content-title">สถานะการจอง</span>
      </h1>
    </header>
    <b-table :items="booking" :fields="fields">
      <template #cell(operators)="{ item }">
        <b-button variant="danger" @click="deleteBooking(item._id)">ยกเลิก</b-button>
      </template>
      <template #cell(room)="{ item }">
        {{ item.room.code }} - {{ item.room.name }}
      </template>
      <template #cell(status)="{ item }">
        {{ isStatus(item.status) }}
      </template>
    </b-table>
  </b-container>
</template>

<script>
import axios from 'axios'
import { deleteBooking } from '../services/event'
export default {
  data () {
    return {
      fields: [
        { key: 'room', label: 'ห้อง' },
        { key: 'transactionDate', label: 'วันทำการ' },
        { key: 'startDate', label: 'วัน/เวลาเริ่มต้น' },
        { key: 'endDate', label: 'วัน/เวลาสิ้นสุด' },
        { key: 'reason', label: 'วัตถุประสงค์' },
        { key: 'status', label: 'สถานะ' },
        { key: 'operators', label: 'กระบวนการ' }
      ],
      userb: [],
      booking: [],
      check: false,
      checkU: false
    }
  },
  methods: {
    isBooking (items) {
      console.log(items)
      const self = this
      if (self.check === false && items != null) {
        axios
          .get('http://localhost:3000/booking/users/' + items)
          .then((response) => {
            console.log(response)
            self.booking = response.data
          })
        self.check = true
      }
    },
    deleteBooking (item) {
      console.log(item)
      deleteBooking(item)
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
      } else if (item === '1') {
        status += 'ผ่านการอนุมัติ'
      } else if (item === '2') {
        status += 'ไม่ผ่านการอนุมัติ'
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
  }
}
</script>
<style></style>
