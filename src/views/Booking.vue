<template>
  <b-container class="bv-example-row bv-example-row-flex-cols">
    <b-row align-v="start">
      <b-col>
        <header class="bd-content" align="left">
          <h1 id="calendar" class="bv-no-focus-ring" tabindex="-1">
            <span class="bd-content-reason">ตึก</span>
          </h1>
          <p class="bd-lead; border border-dark; rounded">
            {{ showBuilding() }}
          </p>
        </header>
        <b-form-group align="left" label="วัตถุประสงค์">
          <b-form-radio v-model="reason" value="ประชุม">ประชุม</b-form-radio>
          <b-form-radio v-model="reason" value="ฝึกอบรม">ฝึกอบรม</b-form-radio>
          <b-form-radio v-model="reason" value="สัมมนา">สัมมนา</b-form-radio>
          <b-form-radio v-model="reason" value="จัดการเรียนการสอน"
            >จัดการเรียนการสอน</b-form-radio
          >
          <b-form-group label="เรื่อง" label-cols="1">
            <b-form-input v-model="reason" type="text"></b-form-input>
          </b-form-group>
          <label for="start-date">วันเริ่มต้น</label>
          <b-form-datepicker
            id="start-date"
            class="mb-2"
            locale="th"
            v-model="startDate"
          ></b-form-datepicker>
          <label for="end-date">วันสิ้นสุด</label>
          <b-form-datepicker
            id="end-date"
            class="mb-2"
            locale="th"
            v-model="endDate"
          ></b-form-datepicker>
          <label for="start-time">เวลาเริ่มต้น</label
          ><b-form-timepicker
            v-model="startTime"
            id="start-time"
            locale="th"
          ></b-form-timepicker>
          <label for="end-time">เวลาสิ้นสุด</label
          ><b-form-timepicker
            v-model="endTime"
            id="end-time"
            locale="th"
          ></b-form-timepicker>
        </b-form-group>
      </b-col>
      <b-col>
        <header class="bd-content" align="left">
          <h1 id="calendar" class="bv-no-focus-ring" tabindex="-1">
            <span class="bd-content-reason">ห้อง</span>
          </h1>
          <p class="bd-lead; border border-dark; rounded">
            {{ roomb.code }} - {{ roomb.name }}
          </p>
        </header>
        <b-form-group label="อุปกรณ์ที่ต้องใช้" align="left">
          <b-form-input
            v-model="tool"
            class="w-5 p-3"
            type="text"
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <vue-cal
      :locale="th"
      active-view="week"
      :events="events"
      @ready="ready($event)"
      @view-change="viewChange($event)"
    />
    <router-link to="/status"><b-button @click="addEvent()">Add</b-button></router-link>
  </b-container>
</template>
<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import th from '../locale/th'
import { getEvents, addEvent } from '../services/event'
import axios from 'axios'
export default {
  props: ['roomid'],
  data () {
    return {
      selected: [],
      options: [
        { text: 'ระบบเครื่องเสียง', value: 'orange' },
        { text: 'โปรเจคเตอร์', value: 'apple' },
        { text: 'โน๊ตบุ๊ค', value: 'pineapple' },
        { text: 'ไมค์', value: 'grape' }
      ],
      roomb: {},
      buildingb: {},
      check: false,
      checkb: false,
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      reason: '',
      user: {},
      transactionDate: '',
      room: {},
      tool: '',
      events: []
    }
  },
  computed: {
    th () {
      return th
    },
    isUserId () {
      return this.$store.getters['auth/isUserId']
    },
    validateReason () {
      return this.reason.length >= 1
    },
    validateStartDate () {
      return this.startDate && this.startTime != null
    },
    validateEndDate () {
      return this.endDate && this.endDate != null
    },
    validateForm () {
      return this.validateReason && this.validateStartDate && this.validateEndDate
    }
  },
  components: {
    VueCal
  },
  methods: {
    showBuilding () {
      return this.buildingb.name
    },
    isRoom (itemid) {
      const self = this
      if (self.check === false) {
        axios.get('http://localhost:3000/room/' + itemid).then((response) => {
          console.log(response)
          self.roomb = response.data
          self.buildingb = self.roomb.building
        })
        self.check = true
      }
    },
    async addEvent () {
      const event = {
        transactionDate: new Date().toLocaleDateString(),
        startDate: new Date(this.startDate + ' ' + this.startTime),
        endDate: new Date(this.endDate + ' ' + this.endTime),
        reason: this.reason,
        tool: this.tool,
        room: this.roomb._id,
        user: this.$store.getters['auth/isUserId'],
        approveres: this.roomb.approveres
      }
      if (!this.validateForm) return
      console.log(event)
      await addEvent(event)
      console.log(this.$store.getters['auth/isUserId'])
      // this.$router.push('Status')
      // window.location.reload()
    },
    async ready (e) {
      console.log('ready', e)
      const res = await getEvents(e.startDate, e.endDate)
      const newEvents = res.data.map(function (event) {
        return {
          start: new Date(event.startDate),
          end: new Date(event.endDate),
          reason: event.reason,
          tool: event.tool,
          class: event.class
        }
      })
      this.events = newEvents
    },
    async viewChange (e) {
      console.log('view-change', e)
      const res = await getEvents(e.startDate, e.endDate)
      const newEvents = res.data.map(function (event) {
        return {
          transactionDate: new Date().toLocaleDateString(),
          start: new Date(event.startDate),
          end: new Date(event.endDate),
          reason: event.reason,
          tool: event.tool,
          class: event.class
        }
      })
      this.events = newEvents
    }
  },
  mounted () {
    this.isRoom(this.roomid)
  }
}
</script>
<style>
.vuecal__now-line {
  color: #06c;
}
.vuecal__event.a {
  background-color: rgba(253, 156, 66, 0.9);
  border: 1px solid rgb(233, 136, 46);
  color: #fff;
}
.vuecal__event.b {
  background-color: rgba(253, 156, 66, 0.9);
  border: 1px solid rgb(233, 136, 46);
  color: #fff;
}
.vuecal__event.c {
  background-color: rgba(255, 102, 102, 0.9);
  border: 1px solid rgb(235, 82, 82);
  color: #fff;
}
.vuecal__event.vdo_time {
  background-color: rgba(255, 102, 102, 0.9);
  border: 1px solid rgb(235, 82, 82);
  color: #fff;
}
</style>
