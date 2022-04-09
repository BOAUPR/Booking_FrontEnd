<template>
  <b-container class="bv-example-row bv-example-row-flex-cols">
    <b-row align-v="start">
      <b-col>
        <header class="bd-content" align="left">
          <h1 id="calendar" class="bv-no-focus-ring" tabindex="-1">
            <span class="bd-content-title">ตึก</span>
          </h1>
          <p class="bd-lead; border border-dark; rounded">
            IF อาคารวิทยาการสารสนเทศ
          </p>
        </header>
        <b-form-group align="left" label="วัตถุประสงค์">
          <b-form-radio
            v-model="selected"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="A"
            >ประชุม</b-form-radio
          >
          <b-form-radio
            v-model="selected"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="B"
            >ฝึกอบรม</b-form-radio
          >
          <b-form-radio
            v-model="selected"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="A"
            >สัมมนา</b-form-radio
          >
          <b-form-radio
            v-model="selected"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="B"
            >จัดการเรียนการสอน</b-form-radio
          >
          <b-form-radio
            v-model="selected"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="B"
            >อื่น</b-form-radio
          >
          <b-form-group label="เรื่อง" label-cols="1">
            <b-form-input type="text" placeholder=""></b-form-input>
          </b-form-group>
          <label for="start-date">วันเริ่มต้น</label>
          <b-form-datepicker
            id="start-date"
            class="mb-2"
            locale="th"
          ></b-form-datepicker>
          <label for="start-date">วันสิ้นสุด</label>
          <b-form-datepicker
            id="start-date"
            class="mb-2"
            locale="th"
          ></b-form-datepicker>
          <label for="start-time">เวลาเริ่มต้น</label
          ><b-form-timepicker id="start-time" locale="th"></b-form-timepicker>
          <label for="end-time">เวลาสิ้นสุด</label
          ><b-form-timepicker id="end-time" locale="th"></b-form-timepicker>
        </b-form-group>
      </b-col>
      <b-col>
        <header class="bd-content" align="left">
          <h1 id="calendar" class="bv-no-focus-ring" tabindex="-1">
            <span class="bd-content-title">ห้อง</span>
          </h1>
          <p class="bd-lead; border border-dark; rounded">IF-3C01</p>
        </header>
        <b-form-group label="จำนวนผู้เข้าร่วม" label-cols="3" align="left">
          <b-form-input class="w-25 p-3"></b-form-input>คน
        </b-form-group>
          <b-form-group label="อุปกรณืที่ต้องใช้" align="left" v-slot="{ ariaDescribedby }">
            <b-form-checkbox-group
                v-model="selected"
                :options="options"
                :aria-describedby="ariaDescribedby"
                name="flavour-2a"
                stacked>
            </b-form-checkbox-group>
          </b-form-group>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  data () {
    return {
      selected: [], // Must be an array reference!
      options: [
        { text: 'ระบบเครื่องเสียง', value: 'orange' },
        { text: 'โปรเจคเตอร์', value: 'apple' },
        { text: 'โน๊ตบุ๊ค', value: 'pineapple' },
        { text: 'ไมค์', value: 'grape' }
      ]
    }
  }
}
</script>
<style></style>
