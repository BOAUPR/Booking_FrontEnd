<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col>
          <RoomForm :room="selectedItem" :approvs="allApprov"
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
import api from '../../services/api.js'
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
      // console.log('Submit', room)
      api.put('http://localhost:3000/room/' + room._id, room).then(
        (response) => {
          const updateRoom = response.data
          this.getRooms()
          this.makeToast('แก้ไขสำเร็จ', 'ห้อง ' + updateRoom.code + '-' + updateRoom.name + ' แก้ไขแล้ว')
        }
      ).catch(() => {
        this.makeToast('ปรับปรุงไม่สำเร็จ', 'ไม่สามารถปรับปรุง' + room.code + '-' + room.name, 'danger')
      })
    },
    editRoom (item) {
      this.getAllApprover(item.approveres[0].institution)
      this.selectedItem = JSON.parse(JSON.stringify(item))
      this.$nextTick(() => {
        this.$refs.roomForm.show()
      })
    },
    getRooms () {
      api.get('http://localhost:3000/room').then((response) => {
        this.numRoom = response.data
      })
    },
    getApprover2 (item) {
      // console.log(item)
      var approv = []
      for (let index = 0; index < item.length; index++) {
        approv += item[index].name + ' ' + item[index].surname + ''
        if (index !== item.length - 1) {
          approv += ', '
        }
      }
      // console.log(approv)
      return approv
    },
    getAllApprover (idInstitution) {
      const self = this
      api.get('http://localhost:3000/users/approveres/' + idInstitution).then((response) => {
        self.allApprov = response.data
      })
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
      approverSelect: {},
      allApprov: []
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
