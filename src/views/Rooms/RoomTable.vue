<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col>
          <RoomForm :room="selectedItem"
            ref="roomForm"
            @save="saveRoom">
          </RoomForm>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table :items="numRoom" :fields="fields">
            <template #cell(operators)="{ item }">
              <b-button variant="danger" @click="editRoom(item)"
                >แก้ไข</b-button
              >
            </template>

            <template #cell(name)="{ item }">
              {{ item.code }} - {{ item.name }}
            </template>

            <template #cell(building)="{ item }">
              {{ item.building.name }}
            </template>

            <template #cell(approveres)="{ item }">
              {{ getApprover2(item.approveres) }}
            </template>

          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import axios from 'axios'
import RoomForm from './RoomForm.vue'
export default {
  components: {
    RoomForm
  },
  methods: {
    makeToast (title, message, variant = 'success', append = false) {
      this.toastCount++
      this.$bvToast.toast(message, {
        title: title,
        variant: variant,
        autoHideDelay: 3000,
        appendToast: append
      })
    },
    saveRoom (room) {
      console.log('Submit', room)
      axios.put('http://localhost:3000/room/' + room._id, room).then(
        (response) => {
          const updateRoom = response.data
          console.log(updateRoom)
          this.getRooms()
          this.makeToast('แก้ไขสำเร็จ', 'ห้อง ' + updateRoom._id + ' แก้ไขแล้ว')
        }
      ).catch(() => {
        this.makeToast('ปรับปรุงไม่สำเร็จ', 'ไม่สามารถปรับปรุง' + room._id, 'danger')
      })
    },
    editRoom (item) {
      this.selectedItem = JSON.parse(JSON.stringify(item))
      this.$nextTick(() => {
        this.$refs.roomForm.show()
      })
    },
    getRooms () {
      axios.get('http://localhost:3000/room').then((response) => {
        console.log(response)
        this.numRoom = response.data
      })
      console.log(this.fields)
    },
    getApprover2 (item) {
      console.log(item)
      var approv = []
      for (let index = 0; index < item.length; index++) {
        approv += item[index].name + ' ' + item[index].surname + ''
        if (index !== item.length - 1) {
          approv += ', '
        }
      }
      console.log(approv)
      return approv
    }
  },
  data () {
    return {
      fields: [
        { key: 'name', label: 'รหัสห้อง' },
        { key: 'capacity', label: 'ความจุ' },
        { key: 'floor', label: 'ชั้น' },
        { key: 'building', label: 'อาคาร' },
        { key: 'equipment', label: 'อุปกรณ์ภายในห้อง' },
        { key: 'approveres', label: 'ผู้พิจารณา' },
        { key: 'operators', label: 'กระบวนการ' }
      ],
      numRoom: [],
      selectedItem: null,
      buildingSelect: {},
      approverSelect: {}
    }
  },
  mounted () {
    this.getRooms()
  },
  computed: {
  }
}
</script>
<style></style>
