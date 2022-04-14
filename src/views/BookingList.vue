<template>
  <b-container>
    <header class="bd-content" align="left">
      <h1 class="bv-no-focus-ring">
        <span class="bd-content-title">สถานะการจอง</span>
      </h1>
    </header>
    <b-table :items="needApprove" :fields="fields">
      <template #cell(room)="{ item }">
        {{ item.room.code }} - {{ item.room.name }}
      </template>
      <template #cell(user)="{ item }">
        {{ item.user.name }} {{ item.user.surname }}
      </template>
      <template #cell(status)="{ item }">
        {{ isStatus(item.status) }}
      </template>
      <template #cell(operators)="{ item }">
        <b-button @click="accept(item)">อนุมัติ</b-button
        ><b-button class="ml-1" variant="danger" @click="notAccept(item)"
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
        { key: 'room', label: 'ห้อง' },
        { key: 'user', label: 'ชื่อ-นามสกุล' },
        { key: 'startDate', label: 'วัน/เวลาเริ่มต้น' },
        { key: 'endDate', label: 'วัน/เวลาสิ้นสุด' },
        { key: 'reason', label: 'วัตถุประสงค์' },
        { key: 'tool', label: 'อุปกรณ์' },
        { key: 'status', label: 'สถานะ' },
        { key: 'operators', label: 'กระบวนการ' }
      ],
      waitingapprover: [],
      needApprove: [],
      checkU: false,
      approveres: [],
      userb: {}
    }
  },
  methods: {
    async getAllWaiting () {
      const self = this
      const ourBooking = []
      self.userb = self.$store.getters['auth/isUserId']
      api.get('http://localhost:3000/booking/getall').then((response) => {
        // console.log(response)
        self.waitingapprover = response.data
        // console.log(self.waitingapprover[0].room)
        // console.log(self.userb)
        for (let i = 0; i < self.waitingapprover.length; i++) {
          // console.log(self.waitingapprover[i].approveres)
          self.approveres = self.waitingapprover[i].approveres
          for (let j = 0; j < self.approveres.length; j++) {
            const approver = self.approveres[j]
            // console.log(approver)
            if (approver.user === self.userb) {
              // console.log('im here')
              if (approver.status === '0') {
                ourBooking.push(self.waitingapprover[i])
                break
              }
            }
          }
        }
        self.needApprove = ourBooking
        // console.log('Here :' + self.needApprove)
      })
      // console.log('Here out :' + self.needApprove)
    },
    accept (item) {
      // const approveres = item.approveres
      for (let i = 0; i < item.approveres.length; i++) {
        const approver = item.approveres[i]
        // console.log(approver)
        if (approver.user === this.userb) {
          // console.log('im here')
          const updateApprover = approver
          updateApprover.status = '1'
          api.put(
            'http://localhost:3000/approver/' + updateApprover._id,
            updateApprover
          )
          item.approveres[i] = updateApprover
          api.put('http://localhost:3000/booking/' + item._id, item)
        }
      }
      var count = 0
      for (let i = 0; i < item.approveres.length; i++) {
        const approver = item.approveres[i]
        // console.log(approver)
        if (approver.status === '1') {
          count++
        }
      }
      if (count === item.approveres.length) {
        item.status = '1'
        api.put('http://localhost:3000/booking/' + item._id, item)
      }
      window.location.reload()
    },
    notAccept (item) {
      item.status = '2'
      api.put('http://localhost:3000/booking/' + item._id, item)
      window.location.reload()
    },
    isStatus (item) {
      var status = []
      if (item === '0') {
        status += 'รอการอนุมัติ'
      }
      return status
    }
  },
  computed: {},
  mounted () {
    this.getAllWaiting()
  }
}
</script>
<style></style>
